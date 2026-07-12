"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function KPICards() {

const [vehicles,setVehicles]=useState(0);
const [drivers,setDrivers]=useState(0);
const [trips,setTrips]=useState(0);

useEffect(()=>{
load();
},[]);

async function load(){

const {count:v}=await supabase
.from("vehicles")
.select("*",{count:"exact",head:true});

const {count:d}=await supabase
.from("drivers")
.select("*",{count:"exact",head:true});

const {count:t}=await supabase
.from("trips")
.select("*",{count:"exact",head:true});

setVehicles(v||0);
setDrivers(d||0);
setTrips(t||0);

}

return(

<div className="grid grid-cols-3 gap-6">

<div className="rounded-lg border p-6">
<h2>Total Vehicles</h2>
<p className="text-3xl font-bold">{vehicles}</p>
</div>

<div className="rounded-lg border p-6">
<h2>Total Drivers</h2>
<p className="text-3xl font-bold">{drivers}</p>
</div>

<div className="rounded-lg border p-6">
<h2>Total Trips</h2>
<p className="text-3xl font-bold">{trips}</p>
</div>

</div>

);

}