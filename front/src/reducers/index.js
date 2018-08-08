import { combineReducers } from 'redux';
import loggedIn from './reducerLogin';
import TrashesReducer from './reducerTrashes';
import reducerIdTrash from './reducerTrashDetails';
import reducerIdUser from './reducerTrashUser';
import reducerStatsNewConnectedTrashes from './reducerStatsNewConnectedTrashes';
import reducerStatsVolumeTubsTrashes from './reducerStatsVolumeTubsTrashes';
import reducerMaintenance from './reducerTabMaintenance';
import reducerTrashesOffline from './reducerTrashesOffline';
import reducerSugg from './reducerSugg';
import reducerSerialList from './reducerSerialList';

const allReducers = combineReducers({
  loggedIn,
  trashes: TrashesReducer,
  TrashId: reducerIdTrash,
  UserId: reducerIdUser,
  statsNewConnectedTrashes: reducerStatsNewConnectedTrashes,
  statsVolumeTubsTrashes: reducerStatsVolumeTubsTrashes,
  Maintenance: reducerMaintenance,
  TrashesOffline: reducerTrashesOffline,
  sugg:reducerSugg,
  serialList:reducerSerialList,
});

export default allReducers;
