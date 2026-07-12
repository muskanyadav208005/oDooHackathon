CREATE TABLE fuel_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    vehicle_id UUID
    REFERENCES vehicles(id)
    ON DELETE CASCADE,

    liters NUMERIC NOT NULL
    CHECK(liters>0),

    price_per_liter NUMERIC NOT NULL
    CHECK(price_per_liter>0),

    total_cost NUMERIC GENERATED ALWAYS AS
    (
        liters * price_per_liter
    ) VIRTUAL,

    odometer NUMERIC NOT NULL,

    fuel_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT NOW()
);