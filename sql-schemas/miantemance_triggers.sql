CREATE OR REPLACE FUNCTION start_maintenance(p_vehicle UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    v_status TEXT;
BEGIN

    SELECT status
    INTO v_status
    FROM vehicles
    WHERE id=p_vehicle;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Vehicle not found';
    END IF;

    IF v_status='On Trip' THEN
        RAISE EXCEPTION 'Vehicle currently on trip';
    END IF;

    IF v_status='In Shop' THEN
        RAISE EXCEPTION 'Vehicle already in maintenance';
    END IF;

    IF v_status='Retired' THEN
        RAISE EXCEPTION 'Retired vehicle cannot enter maintenance';
    END IF;

    UPDATE vehicles
    SET status='In Shop'
    WHERE id=p_vehicle;

    PERFORM log_activity(
        'Vehicle',
        p_vehicle,
        'Maintenance Started',
        'Available',
        'In Shop',
        'Vehicle moved to maintenance'
    );

END;
$$;


CREATE OR REPLACE FUNCTION finish_maintenance(p_vehicle UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    v_status TEXT;
BEGIN

    SELECT status
    INTO v_status
    FROM vehicles
    WHERE id=p_vehicle;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Vehicle not found';
    END IF;

    IF v_status<>'In Shop' THEN
        RAISE EXCEPTION 'Vehicle is not under maintenance';
    END IF;

    UPDATE vehicles
    SET status='Available'
    WHERE id=p_vehicle;

    PERFORM log_activity(
        'Vehicle',
        p_vehicle,
        'Maintenance Completed',
        'In Shop',
        'Available',
        'Vehicle maintenance completed'
    );

END;
$$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER vehicle_updated_at
BEFORE UPDATE
ON vehicles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER driver_updated_at
BEFORE UPDATE
ON drivers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER trip_updated_at
BEFORE UPDATE
ON trips
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER maintenance_updated_at
BEFORE UPDATE
ON maintenance_logs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();



CREATE OR REPLACE FUNCTION audit_status_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

    IF OLD.status IS DISTINCT FROM NEW.status THEN

        INSERT INTO audit_logs
        (
            user_id,
            entity_type,
            entity_id,
            action,
            old_status,
            new_status,
            description
        )

        VALUES
        (
            auth.uid(),

            TG_ARGV[0],

            NEW.id,

            'Automatic Status Change',

            OLD.status,

            NEW.status,

            TG_ARGV[0] || ' status changed automatically'

        );

    END IF;

    RETURN NEW;

END;
$$;


CREATE TRIGGER vehicle_audit

AFTER UPDATE

ON vehicles

FOR EACH ROW

EXECUTE FUNCTION audit_status_changes('Vehicle');

CREATE TRIGGER driver_audit

AFTER UPDATE

ON drivers

FOR EACH ROW

EXECUTE FUNCTION audit_status_changes('Driver');


CREATE TRIGGER trip_audit

AFTER UPDATE

ON trips

FOR EACH ROW

EXECUTE FUNCTION audit_status_changes('Trip');


CREATE OR REPLACE FUNCTION validate_vehicle_status()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE

v_trip_count INTEGER;

BEGIN

SELECT COUNT(*)

INTO v_trip_count

FROM trips

WHERE vehicle_id=NEW.id

AND status='Dispatched';

IF NEW.status='Retired'
AND v_trip_count>0 THEN

RAISE EXCEPTION
'Vehicle currently assigned to a trip';

END IF;

IF OLD.status='In Shop'
AND NEW.status='On Trip' THEN

RAISE EXCEPTION
'Vehicle must become Available before dispatch';

END IF;

RETURN NEW;

END;
$$;


CREATE TRIGGER validate_vehicle

BEFORE UPDATE

ON vehicles

FOR EACH ROW

EXECUTE FUNCTION validate_vehicle_status();



CREATE OR REPLACE FUNCTION validate_driver_status()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

IF NEW.status='On Trip'
AND NEW.license_expiry<CURRENT_DATE THEN

RAISE EXCEPTION
'Driver license expired';

END IF;

RETURN NEW;

END;
$$;

CREATE TRIGGER validate_driver

BEFORE UPDATE

ON drivers

FOR EACH ROW

EXECUTE FUNCTION validate_driver_status();



CREATE OR REPLACE FUNCTION validate_trip_status()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

IF OLD.status='Completed'
AND NEW.status<>'Completed' THEN

RAISE EXCEPTION
'Completed trips cannot be modified';

END IF;

RETURN NEW;

END;
$$;


CREATE TRIGGER validate_trip

BEFORE UPDATE

ON trips

FOR EACH ROW

EXECUTE FUNCTION validate_trip_status();




CREATE OR REPLACE FUNCTION maintenance_vehicle_status()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

UPDATE vehicles

SET status='In Shop'

WHERE id=NEW.vehicle_id;

RETURN NEW;

END;
$$;


CREATE TRIGGER maintenance_insert

AFTER INSERT

ON maintenance_logs

FOR EACH ROW

EXECUTE FUNCTION maintenance_vehicle_status();



CREATE OR REPLACE FUNCTION update_vehicle_odometer()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

UPDATE vehicles

SET odometer=NEW.odometer

WHERE id=NEW.vehicle_id;

RETURN NEW;

END;
$$;



CREATE TRIGGER fuel_insert

AFTER INSERT

ON fuel_logs

FOR EACH ROW

EXECUTE FUNCTION update_vehicle_odometer();