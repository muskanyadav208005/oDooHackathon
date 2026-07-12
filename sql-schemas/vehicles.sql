CREATE TABLE vehicles (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    registration_number TEXT UNIQUE NOT NULL,

    manufacturer TEXT NOT NULL,

    model TEXT NOT NULL,

    vehicle_type TEXT NOT NULL,

    max_load NUMERIC NOT NULL
    CHECK(max_load > 0),

    fuel_type TEXT NOT NULL,

    odometer NUMERIC DEFAULT 0
    CHECK(odometer >= 0),

    acquisition_cost NUMERIC NOT NULL
    CHECK(acquisition_cost >= 0),

    status TEXT NOT NULL DEFAULT 'Available'
    CHECK(status IN
    (
        'Available',
        'On Trip',
        'In Shop',
        'Retired'
    )),

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);