<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {formatDate, formatDateToInput, paramUrl} from "@/helpers/functions";
import ModalUpdate from "@/components/campaign/ModalUpdate.vue";
import {IdModal} from "@/enums/IdModal";
import {Status} from '@/enums/Status';
import router from "@/router";
import ModalDelete from "@/components/campaign/ModalDelete.vue";
import {CampaignStatus} from "@/enums/CampaignStatus";

const props = defineProps<{
  campaigns: ICampaign[],
  campaignGroups: ICampaignGroup[],
  templates: ITemplate[],
  page: number,
  size: number,
  countAll: number
}>()
const dataEdit = reactive<ICampaign>({
  campaignSubCount: 0,
  createBy: "",
  description: "",
  groupId: 0,
  groupName: "",
  id: 0,
  name: "",
  projectCode: "",
  status: 0,
  tempId: 0,
  tempName: "",
  updateBy: ""

});
const idDelete = ref<number>(0);
const handleClickEdit = (campaign: ICampaign) => {
  dataEdit.createBy = campaign.createBy;
  dataEdit.description = campaign.description;
  dataEdit.id = campaign.id;
  dataEdit.name = campaign.name;
  dataEdit.projectCode = campaign.projectCode;
  dataEdit.status = campaign.status;
  dataEdit.groupId = campaign.groupId;
  dataEdit.tempId = campaign.tempId;
  dataEdit.updateBy = campaign.updateBy;
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
        <th scope="col">Tên chiến dịch</th>
        <th scope="col">Template</th>
        <th scope="col">Nhóm chiến dịch</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Mã project</th>
        <th scope="col">Tổng sđt chiến dịch</th>
        <th scope="col">Người tạo</th>
        <th scope="col">Người cập nhật</th>
        <th scope="col">Mô tả</th>
        <th scope="col" class="text-end">Hành động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="campaigns?.length > 0" v-for="campaign in campaigns">
        <td>{{ campaign.id }}</td>
        <td>{{ campaign.name }}</td>
        <td>{{ campaign.tempName }}</td>
        <td>{{ campaign.groupName }}</td>
        <td><span :class="CampaignStatus[campaign.status].color">{{ CampaignStatus[campaign.status].message }}</span></td>
        <td>{{ campaign.projectCode }}</td>
        <td>{{ campaign.campaignSubCount }}</td>
        <td>{{ campaign.createBy }}</td>
        <td>{{ campaign.updateBy }}</td>
        <td>{{ campaign.description }}</td>
        <td class="text-end">
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.update}`"
                  @click="() => handleClickEdit(campaign)">
            <i class="fs-7 fas fa-pen mx-1"></i>Sửa
          </button>
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.delete}`"
                  @click="()=> idDelete = campaign.id">
            <i class="fs-7 fas fa-trash mx-1"></i>Xóa
          </button>
        </td>
      </tr>
      <tr v-else>
        <td colspan="11" class="text-center">Hiện không có dữ liệu nào!</td>
      </tr>
      </tbody>

    </table>
    <ul v-if="countAll > size" class="pagination float-end data-pagination">
    </ul>
  </div>
  <ModalUpdate :campaign="dataEdit" :campaignGroups="campaignGroups" :templates="templates"/>
  <ModalDelete :id="idDelete"/>

</template>