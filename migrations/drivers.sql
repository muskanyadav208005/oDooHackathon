CREATE TABLE drivers (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    profile_id UUID REFERENCES profiles(id),

    license_number TEXT UNIQUE NOT NULL,

    phone TEXT,

    license_expiry DATE NOT NULL,

    status TEXT DEFAULT 'Available'
    CHECK(status IN
    (
        'Available',
        'On Trip',
        'Off Duty',
        'Suspended'
    )),

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);