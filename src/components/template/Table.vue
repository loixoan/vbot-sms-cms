<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {formatDate, paramUrl} from "@/helpers/functions";
import ModalUpdate from "@/components/template/ModalUpdate.vue";
import {IdModal} from "@/enums/IdModal";
import {Status} from '@/enums/Status';
import router from "@/router";
import ModalDelete from "@/components/template/ModalDelete.vue";

const props = defineProps<{
  brandnames: IBrandname[],
  templates: ITemplate[],
  page: number,
  size: number,
  countAll: number
}>()
const dataEdit = reactive<ITemplate>({
  brandname: "", brandnameId: 0, content: "", createAt: "", id: 0, name: "", status: 0

});
const idDelete = ref<number>(0);
const handleClickEdit = (template: ITemplate) => {
  dataEdit.brandname = template.brandname;
  dataEdit.id = template.id;
  dataEdit.name = template.name;
  dataEdit.content = template.content;
  dataEdit.status = template.status;
  dataEdit.brandnameId = template.brandnameId;
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
        <th scope="col">Tên</th>
        <th scope="col">Brandname</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Nội dung</th>
        <th scope="col">Ngày tạo</th>
        <th scope="col" class="text-end">Hành động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="templates?.length > 0" v-for="template in templates">
        <td>{{ template.id }}</td>
        <td>{{ template.name }}</td>
        <td>{{ template.brandname }}</td>
        <td><span :class="Status[template.status].color">{{ Status[template.status].message }}</span></td>
        <td>{{ template.content }}</td>
        <td>{{ formatDate(template.createAt) }}</td>
        <td class="text-end">
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.update}`"
                  @click="() => handleClickEdit(template)">
            <i class="fs-7 fas fa-pen mx-1"></i>Sửa
          </button>
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.delete}`"
                  @click="()=> idDelete = template.id">
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
  <ModalUpdate :template="dataEdit" :brandnames="brandnames"/>
  <ModalDelete :id="idDelete"/>

</template>