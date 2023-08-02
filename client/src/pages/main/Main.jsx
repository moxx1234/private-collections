import { useEffect, useState } from "react"
import { getBiggestCollections, getRecentCollections } from "../../api/collections.api"
import DataTable from "./DataTable"

function Main() {
	const [collections, setCollections] = useState({ biggest: null, recent: null })

	useEffect(() => {
		getBiggestCollections().then(response => setCollections((prevState) => ({ ...prevState, biggest: response })))
		getRecentCollections().then(response => setCollections((prevState) => ({ ...prevState, recent: response })))
	}, [])

	return (
		<>
			{collections.biggest || collections.recent ?
				<>
					<h1 className="mb-2">Biggest collections</h1>
					{collections.biggest && collections.biggest.length && <DataTable data={collections.biggest} />}
					<h2 className="mb-2">Recent collections</h2>
					{collections.recent && collections.recent.length && <DataTable data={collections.recent} />}
				</>
				: <h2>Loading...</h2>}
		</>
	)
}

export default Main