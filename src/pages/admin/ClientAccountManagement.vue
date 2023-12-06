<template>
  <div class="q-pa-md">
    <q-table flat bordered ref="tableRef" title="Clients' Account Management" :rows="rows" :columns="columns" row-key="id"
      selection="multiple" v-model:selected="selected" @selection="handleSelection">
      <template v-slot:header-selection="scope">
        <q-checkbox v-model="scope.selected" />
      </template>

      <template v-slot:body-selection="scope">
        <q-checkbox :model-value="scope.selected"
          @update:model-value="(val, evt) => { Object.getOwnPropertyDescriptor(scope, 'selected').set(val, evt) }" />
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn label="Remove" color="negative" @click="removeRow(props.row)" />
        </q-td>
      </template>

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, nextTick, toRaw } from 'vue';

export default {
  setup() {
    const tableRef = ref();
    const selected = ref([]);
    const rows = ref([]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/system/database/include/usersTable.php');
        const data = await response.json();
        rows.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    nextTick(fetchData);

    const columns = [
      {
        name: 'surname',
        required: true,
        label: 'Surname',
        align: 'left',
        field: 'surname',
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'givenname',
        required: true,
        label: 'Given Name',
        align: 'left',
        field: 'givenname',
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'middlename',
        required: true,
        label: 'Middle Name',
        align: 'left',
        field: 'middlename',
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'email',
        required: true,
        label: 'Email',
        align: 'left',
        field: 'email',
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'username',
        required: true,
        label: 'Username',
        align: 'left',
        field: 'username',
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'contactnumber',
        required: true,
        label: 'Contact Number',
        align: 'left',
        field: 'contactnumber',
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'birthdate',
        required: true,
        label: 'Birthdate',
        align: 'left',
        field: 'birthdate',
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'gender',
        required: true,
        label: 'Gender',
        align: 'left',
        field: 'gender',
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'action',
        required: true,
        label: 'Action',
        align: 'left',
        field: 'id', // Assuming 'id' is a unique identifier for your rows
        format: val => `${val}`,
        sortable: false,
      },
    ];

    const removeRow = async (row) => {
      try {
        const response = await fetch('http://localhost/system/database/include/usersTable.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'remove',
            id: row.id,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log(result.message);
          fetchData(); // Refresh the data after removal
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Error removing account:', error);
      }
    };

    let storedSelectedRow;

    const handleSelection = ({ rows, added, evt }) => {
      if (rows.length !== 1 || evt === void 0) {
        return;
      }

      const [newSelectedRow] = rows;
      const { ctrlKey, shiftKey } = evt;

      if (shiftKey !== true) {
        storedSelectedRow = newSelectedRow;
      }

      nextTick(() => {
        if (shiftKey === true) {
          const tableRows = tableRef.value.filteredSortedRows;
          let firstIndex = tableRows.indexOf(storedSelectedRow);
          let lastIndex = tableRows.indexOf(newSelectedRow);

          if (firstIndex < 0) {
            firstIndex = 0;
          }

          if (firstIndex > lastIndex) {
            [firstIndex, lastIndex] = [lastIndex, firstIndex];
          }

          const rangeRows = tableRows.slice(firstIndex, lastIndex + 1);
          const selectedRows = selected.value.map(toRaw);

          selected.value = added === true
            ? selectedRows.concat(rangeRows.filter(row => selectedRows.includes(row) === false))
            : selectedRows.filter(row => rangeRows.includes(row) === false);
        } else if (ctrlKey === true && added === true) {
          selected.value = [...selected.value, newSelectedRow];
        } else if (ctrlKey !== true && added === true) {
          storedSelectedRow = newSelectedRow;
          selected.value = [newSelectedRow];
        }
      });
    };

    return {
      tableRef,
      selected,
      columns,
      rows,
      handleSelection,
      removeRow,
    };
  },
};
</script>
