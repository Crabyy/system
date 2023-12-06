<template>
  <div class="q-pa-md">
    <q-table flat bordered ref="tableRef" title="Admin Account Management" :rows="rows" :columns="columns" row-key="id"
      selection="multiple" v-model:selected="selected" @selection="handleSelection">
      <template v-slot:header-selection="scope">
        <q-checkbox v-model="scope.selected" />
      </template>

      <template v-slot:body-selection="scope">
        <q-checkbox :model-value="scope.selected"
          @update:model-value="(val, evt) => { Object.getOwnPropertyDescriptor(scope, 'selected').set(val, evt) }" />
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';

export default {
  setup() {
    const tableRef = ref();
    const selected = ref([]);
    const rows = ref([]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/system/database/include/adminTable.php');
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
        sortable: true,
      },
    ];

    const handleSelection = ({ rows, added, evt }) => {
      if (rows.length !== 1 || evt === void 0) {
        return;
      }

      const [newSelectedRow] = rows;

      if (evt.shiftKey !== true) {
        selected.value = [newSelectedRow];
      }
    };

    return {
      tableRef,
      selected,
      columns,
      rows,
      handleSelection,
    };
  },
};
</script>
