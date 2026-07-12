"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { Badge } from "@/components/ui/badge";
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function TripTable(){

const [trips,setTrips]=useState<any[]>([]);

useEffect(()=>{
fetchTrips();
},[]);

async function fetchTrips(){

const {data,error}=await supabase
.from("trips")
.select("*")
.order("created_at",{ascending:false});

if(error){
console.log(error);
return;
}

setTrips(data);

}

return(

<div className="rounded-lg border bg-white shadow-sm">

<Table>

<TableHeader>

<TableRow>

<TableHead>ID</TableHead>
<TableHead>Vehicle</TableHead>
<TableHead>Driver</TableHead>
<TableHead>Origin</TableHead>
<TableHead>Destination</TableHead>
<TableHead>Status</TableHead>
<TableHead className="text-right">Actions</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{trips.map((trip)=>(

<TableRow key={trip.id}>

<TableCell>{trip.id.slice(0,8)}</TableCell>

<TableCell>{trip.vehicle_id?.slice(0,8)}</TableCell>

<TableCell>{trip.driver_id?.slice(0,8)}</TableCell>

<TableCell>{trip.origin}</TableCell>

<TableCell>{trip.destination}</TableCell>

<TableCell>

<Badge

className={
trip.status==="Completed"
?"bg-green-500"
:trip.status==="Dispatched"
?"bg-blue-500"
:trip.status==="Draft"
?"bg-yellow-500 text-black"
:"bg-red-500"
}

>

{trip.status}

</Badge>

</TableCell>

<TableCell className="flex justify-end gap-2">

<Button variant="outline" size="icon">
<Pencil size={16}/>
</Button>

<Button variant="destructive" size="icon">
<Trash2 size={16}/>
</Button>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</div>

);

}