import { useEffect, useState } from "react";


function useCurencyInfo(currency) {

    const [data, setData] = useState({});
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((response) => setData(response[currency]))
    }, [currency])
    return data;
}

export default useCurencyInfo;