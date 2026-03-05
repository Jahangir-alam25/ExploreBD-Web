// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card';
// import { useAuth } from '@/context/AuthContext/AuthContext';
// import { Skeleton } from '@/components/ui/selection';
// import { Calendar, MapPin, Tag, CreditCard } from 'lucide-react';
// import Link from 'next/link';

// type Booking = {
//   id: string;
//   tourName: string;
//   destination: string;
//   date: string;
//   status: 'upcoming' | 'completed' | 'cancelled';
//   price: number;
//   paymentStatus: 'paid' | 'pending';
// };

// const MyBookings = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (authLoading || !user) return;

//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await axios.get<Booking[]>('/dashboard/api/my-bookings?email=user@example.com');
//         setBookings(res.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load your bookings.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [user, authLoading]);

//   const formatDate = (dateStr: string) => {
//     try {
//       return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
//     } catch {
//       return dateStr;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">My Bookings</h1>
//         <p className="text-muted-foreground">All your booked tours in one place.</p>
//       </div>

//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, i) => (
//             <Card key={i} className="border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <Skeleton className="h-6 w-40 mb-2 bg-card/20" />
//                 <Skeleton className="h-4 w-32 mb-1 bg-card/20" />
//                 <Skeleton className="h-4 w-24 bg-card/20" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : error ? (
//         <div className="p-6 bg-red-50 text-red-700 rounded shadow">{error}</div>
//       ) : bookings.length === 0 ? (
//         <div className="p-6 bg-yellow-50 text-yellow-800 rounded shadow">
//           You have no bookings yet. <Link href="/tours" className="text-blue-600 underline">Explore tours</Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {bookings.map((b) => (
//             <Card key={b.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Calendar className="h-5 w-5 text-blue-500" />
//                   {b.tourName}
//                 </CardTitle>
//                 <CardDescription>{b.destination}</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <p><strong>Date:</strong> {formatDate(b.date)}</p>
//                 <p><strong>Status:</strong> <span className={`capitalize ${b.status === 'upcoming' ? 'text-green-500' : b.status === 'completed' ? 'text-gray-500' : 'text-red-500'}`}>{b.status}</span></p>
//                 <p><strong>Price:</strong> ${b.price}</p>
//                 <p><strong>Payment:</strong> <span className={b.paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-500'}>{b.paymentStatus}</span></p>
//                 <Link href={`/dashboard/bookings/${b.id}`} className="text-blue-600 underline">View Details</Link>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { Skeleton } from '@/components/ui/selection';
import { Calendar, MapPin, Tag, CreditCard } from 'lucide-react';
import Link from 'next/link';

type Booking = {
  id: string;
  tourName: string;
  destination: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  paymentStatus: 'paid' | 'pending';
};

const MyBookings = () => {
  const { user, loading: authLoading } = useAuth();
//   const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   

    const fetchBookings = async () => {
      try {
     
        setError(null);
      const res = await axios.get('/api/my-bookings?email=user@example.com');
      setBookings(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load your bookings.');
      }
    };

    fetchBookings();
  }, [user, authLoading]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // ✅ Compute className for status
  const getStatusClass = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-green-500';
      case 'completed':
        return 'text-gray-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // ✅ Compute className for payment
  const getPaymentClass = (paymentStatus: Booking['paymentStatus']) => {
    return paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">All your booked tours in one place.</p>
      </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-40 mb-2 bg-card/20" />
                <Skeleton className="h-4 w-32 mb-1 bg-card/20" />
                <Skeleton className="h-4 w-24 bg-card/20" />
              </CardContent>
            </Card>
          ))}
        </div>
 
        <div className="p-6 bg-red-50 text-red-700 rounded shadow">{error}</div>
   
        <div className="p-6 bg-yellow-50 text-yellow-800 rounded shadow">
          You have no bookings yet. <Link href="/tours" className="text-blue-600 underline">Explore tours</Link>
        </div>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <Card key={b.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  {b.tourName}
                </CardTitle>
                <CardDescription>{b.destination}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Date:</strong> {formatDate(b.date)}</p>
                <p>
                  <strong>Status:</strong> 
                  <span className={`capitalize ${getStatusClass(b.status)}`}>{b.status}</span>
                </p>
                <p>
                  <strong>Price:</strong> ${b.price}
                </p>
                <p>
                  <strong>Payment:</strong> 
                  <span className={getPaymentClass(b.paymentStatus)}>{b.paymentStatus}</span>
                </p>
                <Link href={`/dashboard/bookings/${b.id}`} className="text-blue-600 underline">View Details</Link>
              </CardContent>
            </Card>
          ))}
        </div>
     
    </div>
  );
};

export default MyBookings;