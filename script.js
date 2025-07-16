
const dataout = document.querySelector("#data-output");

let currentPage = 1;
const rowsPerPage = 10;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');



fetch("data.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    renderTable();
    updateButtons();
     const x = data.length;
      console.log(x);
      document.getElementById("output").textContent = x;
    });

    function renderTable() {
      out = '';
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const pageData = data.slice(start, end);
      pageData.forEach(i => {
          console.log(i);
         out += `
             <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
  
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${i.list}
          </th>
          <td class="px-6 py-4 text-center">
            ${i.startdate}
          </td>
          <td class="px-6 py-4 text-center">
            ${i.enddate}
          </td>
          </tr>
          `;
      })
      dataout.innerHTML = out;
    
    }

  function updateButtons() {
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage * rowsPerPage >= data.length;


      const totalPages = Math.ceil(data.length / rowsPerPage);
      document.getElementById("page-info").textContent = `${currentPage} จาก ${totalPages}`;
  }

  prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          renderTable();
          updateButtons();
      }
  });

  nextBtn.addEventListener('click', () => {
      if (currentPage * rowsPerPage < data.length) {
          currentPage++;
          renderTable();
          updateButtons();
      }
  });
