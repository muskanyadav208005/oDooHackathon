CREATE OR REPLACE FUNCTION dispatch_trip(p_trip_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    v_trip_status TEXT;
    v_vehicle UUID;
    v_driver UUID;
    v_vehicle_status TEXT;
    v_driver_status TEXT;
    v_license DATE;
    v_weight NUMERIC;
    v_max_load NUMERIC;
BEGIN

    -- Validation code...

    UPDATE trips
    SET status = 'Dispatched'
    WHERE id = p_trip_id;

    UPDATE vehicles
    SET status = 'On Trip'
    WHERE id = v_vehicle;

    UPDATE drivers
    SET status = 'On Trip'
    WHERE id = v_driver;

    

    PERFORM log_activity(
        'Trip',
        p_trip_id,
        'Dispatch',
        'Draft',
        'Dispatched',
        'Trip dispatched successfully'
    );

    PERFORM log_activity(
        'Vehicle',
        v_vehicle,
        'Status Update',
        'Available',
        'On Trip',
        'Vehicle assigned to trip'
    );

    PERFORM log_activity(
        'Driver',
        v_driver,
        'Status Update',
        'Available',
        'On Trip',
        'Driver assigned to trip'
    );

END;
$$;