import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/react';
import { home, search } from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import VideoPlayerSectionMobile from '../WavoVideosSeccionMobile.jsx';
import DiscoveryPage from './DiscoveryPage.jsx';

const TabsBar: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/wavovideos" component={VideoPlayerSectionMobile} exact={true} />
        <Route path="/acp" component={DiscoveryPage} exact={true} />
        <Redirect exact from="/" to="/wavovideos" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="discovery" href="/discovery">
          <IonIcon icon={search} />
          <IonLabel>Discovery</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsBar;
