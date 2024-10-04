import React, { Suspense } from 'react';
import './listPage.scss'
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
import { Await, useLoaderData } from 'react-router-dom';
function ListPage() {
    const data = useLoaderData()
    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<p>Loading, please wait....</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Oops, something went wrong loading the location</p>}
                        >
                            {
                                (postResponse) => {
                                    return (
                                        postResponse.data.map((item) => {
                                            // console.log("The item is: ", item);
                                            return (
                                                <Card key={item.id} item={item} />
                                            )
                                        }
                                        )
                                    )
                                }
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<p>Loading map....</p>}>
                    <Await
                        resolve={data.postResponse}
                        errorElement={<p>Oops, something went wrong loading the map</p>}
                    >
                        {
                            (postResponse) => {
                                return (
                                    <Map items={postResponse.data} />
                                )
                            }
                        }
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}

export default ListPage;