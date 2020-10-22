import React, {useEffect, useState} from 'react'
import axios from 'axios'

export function useAxiosGet(url) {
    const [beach, setBeach] = useState({loading:false, dt:null})

    useEffect(() => {
        setBeach({
            loading: true, 
            dt: null
        })

        axios.get(url)
            .then(response => {
                setBeach({
                    loading: false,
                    dt: response.data.sensors
                })
        })
            .catch((err) => {
                console.log(err)
            })
    }, [url])

    return beach
}