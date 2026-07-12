CREATE OR REPLACE FUNCTION cancel_trip(p_trip_id UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    v_trip_status TEXT;
    v_vehicle UUID;
    v_driver UUID;
BEGIN

    SELECT status, vehicle_id, driver_id
    INTO v_trip_status, v_vehicle, v_driver
    FROM trips
    WHERE id=p_trip_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Trip not found';
    END IF;

    IF v_trip_status='Completed' THEN
        RAISE EXCEPTION 'Completed trips cannot be cancelled';
    END IF;

    IF v_trip_status='Cancelled' THEN
        RAISE EXCEPTION 'Trip already cancelled';
    END IF;

    UPDATE trips
    SET status='Cancelled'
    WHERE id=p_trip_id;

    UPDATE vehicles
    SET status='Available'
    WHERE id=v_vehicle;

    UPDATE drivers
    SET status='Available'
    WHERE id=v_driver;

    PERFORM log_activity(
        'Trip',
        p_trip_id,
        'Cancel',
        v_trip_status,
        'Cancelled',
        'Trip cancelled'
    );

    PERFORM log_activity(
        'Vehicle',
        v_vehicle,
        'Status Update',
        'On Trip',
        'Available',
        'Vehicle released'
    );

    PERFORM log_activity(
        'Driver',
        v_driver,
        'Status Update',
        'On Trip',
        'Available',
        'Driver released'
    );

END;
$$;