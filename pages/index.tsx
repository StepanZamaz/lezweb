import type { NextPage } from 'next'
import Link from 'next/link'
//https://coolors.co/4a4c3f-88736d-588e2b-030301
const Home: NextPage = () => {
  return (
    <div>
      <h1>Boulderový průvodce</h1>
      <p><Link href="/listLoc">Oblasti</Link> </p>
    </div>
  )
}

export default Home
