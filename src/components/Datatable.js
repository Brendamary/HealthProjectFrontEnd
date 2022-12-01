import React from 'react';
import DataTable from 'react-data-table-component';

/*npm install react-data-table-component styled-components == https://www.cluemediator.com/how-to-implement-datatable-in-react*/
function Datatable() {

    const data = [
        {
        "name": "Katelyn T. Boyle",
        "phone": "1-389-886-8523",
        "email": "mi.lacinia@laciniamattis.edu",
        "dob": "07/11/1997"
        },
        {
        "name": "September Y. Forbes",
        "phone": "879-4512",
        "email": "Proin.mi.Aliquam@arcuVestibulum.org",
        "dob": "01/11/1968"
        },
        {
        "name": "Kaseem T. Potts",
        "phone": "612-9561",
        "email": "tempus.lorem@luctussitamet.org",
        "dob": "11/04/1995"
        },
        {
        "name": "Maite Mcintosh",
        "phone": "1-727-227-3534",
        "email": "sagittis.Duis@tellusPhaselluselit.net",
        "dob": "30/08/1988"
        },
        {
        "name": "Kerry Calderon",
        "phone": "1-730-492-6543",
        "email": "Integer.sem@nisi.org",
        "dob": "07/11/1973"
        },
        {
        "name": "Hakeem W. Fowler",
        "phone": "897-7252",
        "email": "et.arcu@Quisque.co.uk",
        "dob": "10/06/1987"
        },
        {
        "name": "Steel Bruce",
        "phone": "1-233-437-3487",
        "email": "Donec.nibh.enim@ametnulla.net",
        "dob": "06/08/1978"
        },
        {
        "name": "Joseph Henderson",
        "phone": "1-881-206-0743",
        "email": "Sed.nec@risusDonecegestas.ca",
        "dob": "14/06/1988"
        },
        {
        "name": "Quinn L. Lamb",
        "phone": "999-8845",
        "email": "accumsan.laoreet.ipsum@Donecnibh.com",
        "dob": "24/08/1998"
        },
        {
        "name": "Hadley Shields",
        "phone": "1-690-958-1438",
        "email": "ante.dictum@ornareegestas.ca",
        "dob": "11/09/1985"
        },
        {
        "name": "Tara S. Clarke",
        "phone": "539-3379",
        "email": "posuere.enim.nisl@faucibusidlibero.ca",
        "dob": "18/07/1974"
        },
        {
        "name": "Travis Zamora",
        "phone": "1-410-239-6938",
        "email": "Nam@fringilla.edu",
        "dob": "16/03/1980"
        },
        {
        "name": "Hilel Chandler",
        "phone": "1-842-693-3527",
        "email": "placerat.augue.Sed@velitegestas.com",
        "dob": "01/07/1983"
        },
        {
        "name": "Maisie Phelps",
        "phone": "1-695-407-3574",
        "email": "nisi.nibh@Fuscefeugiat.org",
        "dob": "13/10/1980"
        },
        {
        "name": "Heidi Montgomery",
        "phone": "1-264-258-4447",
        "email": "vulputate.posuere.vulputate@ametornarelectus.com",
        "dob": "10/12/1971"
        },
        {
        "name": "Jackson Oneil",
        "phone": "1-638-155-3149",
        "email": "tempor.arcu@sed.ca",
        "dob": "13/08/1983"
        },
        {
        "name": "Savannah Q. Osborn",
        "phone": "392-6188",
        "email": "hendrerit.neque@Nuncquis.net",
        "dob": "18/06/1999"
        }
    ]

    const columns = [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
        },
        {
          name: 'Phone',
          selector: 'phone',
          sortable: true,
        },
        {
          name: 'Email',
          selector: 'email',
          sortable: true,
        },
        {
          name: 'DOB',
          selector: 'dob',
          sortable: true
        },
      ];  


      return (
        <div className="App">
          <DataTable
            title="Employees"
            columns={columns}
            data={data}
            pagination
            highlightOnHover
          />
        </div>
      );
}

export default Datatable