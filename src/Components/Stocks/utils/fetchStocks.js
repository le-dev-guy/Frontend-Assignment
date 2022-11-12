import { csvToJSON } from './csvtojson';

export const fetchStocksData = (setRows) => {
  fetch('https://prototype.sbulltech.com/api/v2/instruments')
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader();
      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });
    })
    .then((stream) =>
      new Response(stream, { headers: { 'Content-Type': 'text/csv' } }).text()
    )
    .then((result) => {
      csvToJSON(result, setRows);
    });
};
