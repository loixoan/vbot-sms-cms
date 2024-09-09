<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {formatDate, paramUrl} from "@/helpers/functions";
import ModalUpdate from "@/components/customField/ModalUpdate.vue";
import {IdModal} from "@/enums/IdModal";
import {Status} from '@/enums/Status';
import router from "@/router";
import ModalDelete from "@/components/customField/ModalDelete.vue";

const props = defineProps<{
  customFields: ICustomField[],
  page: number,
  size: number,
  countAll: number
}>()
const dataEdit = reactive<ICustomField>({
  description: "", id: 0, isRequired: false, key: "", name: "", projectCode: "", type: ""


});
const idDelete = ref<number>(0);
const handleClickEdit = (customField: ICustomField) => {
  dataEdit.description = customField.description;
  dataEdit.id = customField.id;
  dataEdit.name = customField.name;
  dataEdit.isRequired = customField.isRequired;
  dataEdit.key = customField.key;
  dataEdit.projectCode = customField.projectCode;
  dataEdit.type = customField.type;
}
const initializePagination = () => {
  if ($("ul").hasClass("data-pagination")) {
    $('.data-pagination').pagination({
      dataSource: [...Array(props.countAll).keys()],
      pageNumber: props.page + 1,
      pageSize: props.size,
      callback: (data: any, pageObj: any) => {
        if (pageObj.pageNumber !== props.page + 1) {
          router.push({
            query: {
              ...paramUrl(),
              page: pageObj.pageNumber - 1,
              size: props.size
            }
          });
        }
      }
    });
  }
};
watch([() => props.page, () => props.size, () => props.countAll], () => {
    nextTick(() => initializePagination())
},{immediate:true});


</script>
<template>
  <div class="card-body p-0 table-responsive">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Key</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Mã project</th>
        <th scope="col">Trường bắt buộc</th>
        <th scope="col">Mô tả</th>
        <th scope="col" class="text-end">Hành động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="customFields?.length > 0" v-for="customField in customFields">
        <td>{{ customField.id }}</td>
        <td>{{ customField.key }}</td>
        <td>{{ customField.name }}</td>
        <td>{{ customField.type }}</td>
        <td>{{ customField.projectCode }}</td>
        <td><span :class="customField.isRequired? 'badge bg-danger':'badge bg-warning text-dark'">{{ customField.isRequired? 'Bắt buộc':'Không bắt buộc' }}</span></td>
        <td>{{ customField.description }}</td>
        <td class="text-end">
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.update}`"
                  @click="() => handleClickEdit(customField)">
            <i class="fs-7 fas fa-pen mx-1"></i>Sửa
          </button>
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.delete}`"
                  @click="()=> idDelete = customField.id">
            <i class="fs-7 fas fa-trash mx-1"></i>Xóa
          </button>
        </td>
      </tr>
      <tr v-else>
        <td colspan="8" class="text-center">Hiện không có dữ liệu nào!</td>
      </tr>
      </tbody>

    </table>
    <ul v-if="countAll > size" class="pagination float-end data-pagination">
    </ul>
  </div>
  <ModalUpdate :customField="dataEdit"/>
  <ModalDelete :id="idDelete"/>

</template>