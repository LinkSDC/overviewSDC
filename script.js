/* eslint-disable quote-props */
/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
// import { sleep } from 'k6';

export const options = {
  InsecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 100,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<100'],
  },
};
export default function () {
  http.get(`http://localhost:3001/api/fec2/rfp/products/?product_id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}/related`);
}

// import http from 'k6/http';
// import { Trend } from 'k6/metrics';

// const diffT = new Trend('DiffTrend', true);
// const oldURL = 'http://localhost:3001/api/fec2/rfp/products/';
// const newURL = `http://localhost:3001/api/fec2/rfp/products/?product_id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}`;

// export const options = {
//   InsecureSkipTLSVerify: true,
//   noConnectionReuse: false,
//   vus: 100,
//   stages: [
//     { duration: '10s', target: 100 },
//     { duration: '1m', target: 100 },
//     { duration: '10s', target: 1000 },
//     { duration: '3m', target: 1000 },
//     { duration: '10s', target: 100 },
//     { duration: '3m', target: 100 },
//     { duration: '10s', target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ['rate<0.01'],
//     http_req_duration: ['p(95)<100'],
//   },
// };

// export default function () {
//   const res = http.batch([
//     ['GET', oldURL, null, { 'tags': { 'varaint': 'old' } }],
//     ['GET', newURL, null, { 'tags': { 'varaint': 'new' } }],
//   ]);
//   diffT.add(res[0].timings.duration - res[1].timings.duration);
// }
