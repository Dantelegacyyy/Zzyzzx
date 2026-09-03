import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
const app = initializeApp({ projectId: 'dependable-period-7ds98' });
getAuth()
  .verifyIdToken('dummy')
  .catch((e) => console.log(e.message));
