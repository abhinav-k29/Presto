import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import PresentationList from '../components/PresentationsList';
import Navi from '../components/NavigationBar';

import { BACKEND_URL } from '../App';

function Dashboard ({ token, setTokenFunction }) {
  const [store, setStore] = React.useState({ presentations: [] });
  const [showModal, setShowModal] = React.useState(false);
  console.log(store);

  React.useEffect(() => {
    axios.get(`${BACKEND_URL}/store`, {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      if (response.data.store && response.data.store.presentations) {
        setStore(response.data.store);
      }
    });
  }, [token]);

  React.useEffect(() => {
    if (store && Object.keys(store).length === 0) {
      setStore({ presentations: [] });
    }
  }, [store]);

  if (token === null) {
    return <Navigate to="/login" />
  }

  return <>
    <Navi
      token={token}
      setTokenFunction={setTokenFunction}
      currPresentations={store.presentations}
      showModal={showModal}
      setShowModal={setShowModal}
      setStore={setStore}>
    </Navi>
    <div className="container">
        <div className="text-center mb-4">
          <h2 style={ { margin: '0 auto', padding: '20px' } }>Presentations</h2>
        </div>
        <PresentationList presentations={store.presentations}/>
      </div>
  </>;
}

export default Dashboard;
