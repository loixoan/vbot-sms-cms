<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {paramUrl} from "@/helpers/functions";
import ModalUpdate from "@/components/campaignPhone/ModalUpdate.vue";
import {IdModal} from "@/enums/IdModal";
import {Status} from '@/enums/Status';
import router from "@/router";
import ModalDelete from "@/components/campaignPhone/ModalDelete.vue";
import {CampaignPhoneStatus} from "@/enums/CampaignPhoneStatus";

const props = defineProps<{
  campaigns: ICampaign[],
  campaignPhones: ICampaignPhone[],
  page: number,
  size: number,
  countAll: number
}>()
const dataEdit = reactive<ICampaignPhone>({
  campaignId: 0, campaignName: "", id: 0, name: "", phone: "", status: 0
});
const idDelete = ref<number>(0);
const handleClickEdit = (campaignPhone: ICampaignPhone) => {
  dataEdit.id = campaignPhone.id;
  dataEdit.name = campaignPhone.name;
  dataEdit.phone = campaignPhone.phone;
  dataEdit.status = campaignPhone.status;
  dataEdit.campaignId = campaignPhone.campaignId;
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
        <th scope="col">Sđt</th>
        <th scope="col">Tên chiến dịch</th>
        <th scope="col">Trạng thái</th>
        <th scope="col" class="text-end">Hành động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="campaignPhones?.length > 0" v-for="campaignPhone in campaignPhones">
        <td>{{ campaignPhone.id }}</td>
        <td>{{ campaignPhone.name }}</td>
        <td>{{ campaignPhone.phone }}</td>
        <td>{{ campaignPhone.campaignName }}</td>
        <td><span :class="CampaignPhoneStatus[campaignPhone.status].color">{{ CampaignPhoneStatus[campaignPhone.status].message }}</span></td>
        <td class="text-end">
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.update}`"
                  @click="() => handleClickEdit(campaignPhone)">
            <i class="fs-7 fas fa-pen mx-1"></i>Sửa
          </button>
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.delete}`"
                  @click="()=> idDelete = campaignPhone.id">
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
  <ModalUpdate :campaigns="campaigns" :campaignPhone="dataEdit"/>
  <ModalDelete :id="idDelete"/>

</template>