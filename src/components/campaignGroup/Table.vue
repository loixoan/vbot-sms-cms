<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {formatDate, paramUrl} from "@/helpers/functions";
import ModalUpdate from "@/components/campaignGroup/ModalUpdate.vue";
import {IdModal} from "@/enums/IdModal";
import {Status} from '@/enums/Status';
import router from "@/router";
import ModalDelete from "@/components/campaignGroup/ModalDelete.vue";

const props = defineProps<{
  campaignGroups: ICampaignGroup[],
  page: number,
  size: number,
  countAll: number
}>()
const dataEdit = reactive<ICampaignGroup>({
  createAt: "", description: "", id: 0, name: ""

});
const idDelete = ref<number>(0);
const handleClickEdit = (campaignGroup: ICampaignGroup) => {
  dataEdit.id = campaignGroup.id;
  dataEdit.name = campaignGroup.name;
  dataEdit.description = campaignGroup.description;
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
        <th scope="col">Mô tả</th>
        <th scope="col">Ngày tạo</th>
        <th scope="col" class="text-end">Hành động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="campaignGroups?.length > 0" v-for="campaignGroup in campaignGroups">
        <td>{{ campaignGroup.id }}</td>
        <td>{{ campaignGroup.name }}</td>
        <td>{{ campaignGroup.description }}</td>
        <td>{{ formatDate(campaignGroup.createAt) }}</td>
        <td class="text-end">
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.update}`"
                  @click="() => handleClickEdit(campaignGroup)">
            <i class="fs-7 fas fa-pen mx-1"></i>Sửa
          </button>
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.delete}`"
                  @click="()=> idDelete = campaignGroup.id">
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
  <ModalUpdate :campaignGroup="dataEdit"/>
  <ModalDelete :id="idDelete"/>

</template>