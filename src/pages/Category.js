import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {

    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()
    // cant use async on a use effect so must create a function inside useEffect
    useEffect(() => {
        const fetchListings = async () => {
            try {
                // get a ref to the collection 
                const listingsRef = collection(db, 'listings')

                //create a query 
                //the params is whats linked to the path in the route in app.js
                const q = query(listingsRef, where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'), limit(10)
                )

                //Exicute query
                const querySnap = await getDocs(q)
                //create an empty array 
                const listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('can not show listings')
            }
        }

        fetchListings()
    }, [params.categoryName])


    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent'
                        ? 'Places for rent'
                        : 'Places for sale'}
                </p>
            </header>

            {loading ? <Spinner /> : listings && listings.length > 0 ?
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem
                                    listing={listing.data}
                                    id={listing.id}
                                    key={listing.id}
                                />
                            ))}
                        </ul>
                    </main>
                </>
                : <p>No listings for {params.categoryName}</p>}
        </div>
    )
}

export default Category
