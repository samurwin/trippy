"use client"
import Link from 'next/link';
import { useTrip } from '../TripContext';

export default function ComingSoon(){
  const { trip } = useTrip();
  return(
    <div>
      <h1>This feature is coming soon</h1>
      <Link href={trip?.id ? `/trip/${trip.id}/explore` : ''}>Go to Explore Page</Link>
    </div>
  )
}