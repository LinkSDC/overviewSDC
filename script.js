import http from 'k6/http';

export const options = {
  InsecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 100, // stimulate how many virtual users
  duration: '30s', // how long you want it to run
};
// Below randomize the endpoints
export default function () {
  http.get(`http://localhost:3001/api/fec2/rfp/products/?product_id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}`);
}

// import http from 'k6/http';
// import { sleep } from 'k6';

// export const options = {
//   InsecureSkipTLSVerify: true,
//   noConnectionReuse: false,
//   vus: 1,
//   duration: '10s',
// };
//   // Below randomize the endpoints
// export default function test() {
//   // http.get(`http://localhost:3001/product/?product_id=${Math.floor(Math.random() * (100 - 1 + 1)) + 1}`);
//   http.get('http://localhost:3001/api/fec2/rfp/products/');
// }

// import http from 'k6/http';
// import { Trend } from 'k6/metrics';

// let diffT = new Trend('DiffTrend', true);
// true is just so in the summary it shows them as times

// let oldURL = 'http://localhost:3001/api/fec2/rfp/products/';
// let newURL = 'http://localhost:3001/api/fec2/rfp/products/';

// export const options = {
//   InsecureSkipTLSVerify: true,
//   noConnectionReuse: false,
//   vus: 1,
//   duration: '10s',
// };

// export default function() {
//   // you can use http.get, but this way the two requests will be done at the
//   //  same time which will save time and probably be a better comparison
//   let res = http.batch([
//     ['GET', oldURL, null, {'tags': {'varaint': 'old'}}],
//     ['GET', newURL, null, {'tags': {'varaint': 'new'}}],
//   ]);
//   diffT.add(res[0].timings.duration - res[1].timings.duration);
// }
