<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {formatDate, formatDateToInput, paramUrl} from "@/helpers/functions";
import ModalUpdate from "@/components/brandname/ModalUpdate.vue";
import {IdModal} from "@/enums/IdModal";
import {Status} from '@/enums/Status';
import router from "@/router";
import ModalDelete from "@/components/brandname/ModalDelete.vue";

const props = defineProps<{
  brandnames: IBrandname[],
  page: number,
  size: number,
  countAll: number
}>()
const dataEdit = reactive<IBrandname>({
  code: "", createAt: "", expirationAt: "", id: 0, name: "", projectCode: "", status: 0, type: ""
});
const idDelete = ref<number>(0);
const handleClickEdit = (brandname: IBrandname) => {
  dataEdit.code = brandname.code;
  dataEdit.expirationAt = formatDateToInput(brandname.expirationAt);
  dataEdit.id = brandname.id;
  dataEdit.name = brandname.name;
  dataEdit.projectCode = brandname.projectCode;
  dataEdit.status = brandname.status;
  dataEdit.type = brandname.type;
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
    initializePagination();
});


</script>
<template>
  <div class="card-body p-0 table-responsive">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Mã brandname</th>
        <th scope="col">Tên brandname</th>
        <th scope="col">Mã project</th>
        <th scope="col">Loại</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Ngày hết hạn</th>
        <th scope="col">Ngày tạo</th>
        <th scope="col" class="text-end">Hành động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="brandnames?.length > 0" v-for="brandname in brandnames">
        <td>{{ brandname.id }}</td>
        <td>{{ brandname.code }}</td>
        <td>{{ brandname.name }}</td>
        <td>{{ brandname.projectCode }}</td>
        <td>{{ brandname.type }}</td>
        <td><span :class="Status[brandname.status].color">{{ Status[brandname.status].message }}</span></td>
        <td>{{ formatDate(brandname.expirationAt) }}</td>
        <td>{{ formatDate(brandname.createAt) }}</td>
        <td class="text-end">
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.update}`"
                  @click="() => handleClickEdit(brandname)">
            <i class="fs-7 fas fa-pen mx-1"></i>Sửa
          </button>
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.delete}`"
                  @click="()=> idDelete = brandname.id">
            <i class="fs-7 fas fa-trash mx-1"></i>Xóa
          </button>
        </td>
      </tr>
      <tr v-else>
        <td colspan="9" class="text-center">Hiện không có dữ liệu nào!</td>
      </tr>
      </tbody>
    </table>
      <ul v-if="countAll > size" class="pagination float-end data-pagination">
      </ul>
  </div>
  <ModalUpdate :brandname="dataEdit"/>
  <ModalDelete :id="idDelete"/>

</template>

<style scoped>

</style>