CREATE TABLE trips (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    vehicle_id UUID
    REFERENCES vehicles(id),

    driver_id UUID
    REFERENCES drivers(id),

    origin TEXT NOT NULL,

    destination TEXT NOT NULL,

    cargo_weight NUMERIC NOT NULL
    CHECK(cargo_weight>0),

    distance NUMERIC NOT NULL
    CHECK(distance>0),

    estimated_revenue NUMERIC DEFAULT 0,

    departure_time TIMESTAMP,

    arrival_time TIMESTAMP,

    status TEXT DEFAULT 'Draft'
    CHECK(status IN
    (
        'Draft',
        'Dispatched',
        'Completed',
        'Cancelled'
    )),

    created_at TIMESTAMP DEFAULT NOW()
);