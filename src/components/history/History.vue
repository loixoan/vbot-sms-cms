<script setup lang="ts">
import {nextTick, onMounted, provide, reactive, ref, watch} from "vue";
import {
  formatInstantToDate,
  getAllBrandname, getAllCampaign,
  getAllTemplate, getArrayParamsUrl,
  getCurrentDateInstant,
  paramUrl
} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import router from "@/router";
import {
  countAllHistory,
  getAllHistory
} from "@/services/historyService";
import Table from "@/components/history/Table.vue";
import {CampaignStatus} from "@/enums/CampaignStatus";

const $toast = useToast();
const brandNames = ref<IBrandname[]>([]);
const templates = ref<ITemplate[]>([])
const campaigns = ref<ICampaign[]>([])
const params = reactive({
  page: 0,
  size: 0,
  brandCodes: [] as string[],
  campaignCodes: [] as string[],
  tempCodes: [] as string[],
  status: 0,
  start: getCurrentDateInstant(),
  end: getCurrentDateInstant()
})
const histories = ref<IHistory[]>([]);
const countAll = ref<number>(0);
const fetchDataHistory = async () => {
  await getAllHistory(params.page, params.size, params.brandCodes, params.campaignCodes, params.tempCodes, params.status, params.start, params.end)
      .then(res => {
        histories.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllDataHistory = async () => {
  const res = await countAllHistory(params.brandCodes, params.campaignCodes, params.tempCodes, params.status, params.start, params.end);
  countAll.value = res.data.data;
}
const brandCodes = ref(null)
const tempCodes = ref(null)
const campaignCodes = ref(null)
const handleFilter = () => {
  router.push({
    query: {
      ...paramUrl(),
      campaignCodes: params.campaignCodes,
      brandCodes: params.brandCodes,
      tempCodes: params.tempCodes,
      start: params.start,
      end: params.end,
      status: params.status,
      page: 0
    }
  });
}

const handleDeleteFilter = () => {
  router.push({
    query: {}
  });
}
provide("fetchDataHistory", fetchDataHistory);
provide("getCountAllDataHistory", getCountAllDataHistory);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().brandCodes,
  () => paramUrl().campaignCodes,
  () => paramUrl().tempCodes,
  () => paramUrl().status,
  () => paramUrl().start,
  () => paramUrl().end,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.brandCodes = getArrayParamsUrl(paramUrl().brandCodes);
  params.campaignCodes = getArrayParamsUrl(paramUrl().campaignCodes);
  params.tempCodes = getArrayParamsUrl(paramUrl().tempCodes);
  params.status = Number(paramUrl().status) || 0
  params.start = paramUrl().start ? String(paramUrl().start) : getCurrentDateInstant();
  params.end = paramUrl().end ? String(paramUrl().end) : getCurrentDateInstant();

  await fetchDataHistory()
  await getCountAllDataHistory()
  brandNames.value = await getAllBrandname();
  templates.value = await getAllTemplate();
  campaigns.value = await getAllCampaign();
  $(brandCodes.value).select2().on('change', () => {
    params.brandCodes = $(brandCodes.value).val();
  })
  $(tempCodes.value).select2().on('change', () => {
    params.tempCodes = $(tempCodes.value).val();
  })
  $(campaignCodes.value).select2().on('change', () => {
    params.campaignCodes = $(campaignCodes.value).val();
  })
  await nextTick(() => {
    $(brandCodes.value).val(params.brandCodes)
    $(tempCodes.value).val(params.tempCodes)
    $(campaignCodes.value).val(params.campaignCodes)
  })
}, {immediate: true})
</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-9">
          <h4 class="page-title">CDR</h4>
        </li>
      </ul>
    </div>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card border-0">
            <div class="card-body">
              <div class="mb-3 d-flex justify-content-end align-items-center">
                <label for="brandCodes" class="form-label text-end px-3 col-6">Chọn BrandName</label>
                <select ref="brandCodes" v-model="params.brandCodes" class="form-select" id="brandCodes" multiple>
                  <option v-for="brandName in brandNames" :selected="params.brandCodes.includes(brandName.code)" :value="brandName.code">{{
                      brandName.name
                    }}
                  </option>
                </select>
              </div>
              <div class="mb-3 d-flex justify-content-end align-items-center">
                <label for="tempCodes" class="form-label text-end px-3 col-6">Chọn Template</label>
                <select ref="tempCodes" v-model="params.tempCodes" class="form-select" id="tempCodes" multiple>
                  <option v-for="template in templates" :selected="params.tempCodes.includes(template.code)" :value="template.code">{{
                      template.name
                    }}
                  </option>
                </select>
              </div>
              <div class="mb-3 d-flex justify-content-end align-items-center">
                <label for="campaignCodes" class="form-label text-end px-3 col-6">Chọn chiến dịch</label>
                <select ref="campaignCodes" v-model="params.campaignCodes" class="form-select" id="campaignCodes" multiple>
                  <option v-for="campaign in campaigns" :selected="params.campaignCodes.includes(campaign.code)" :value="campaign.code">{{
                      campaign.name
                    }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card border-0">
            <div class="card-body">
              <div class="mb-3 d-flex justify-content-start align-items-center">
                <select v-model="params.status" class="form-select px-3 w-50" name="status" id="status"
                        aria-label="Default select example">
                  <option value="-1">Trạng thái</option>
                  <option v-for="(value,key) in CampaignStatus" :selected="key == params.status" :value="key">{{
                      value.message
                    }}
                  </option>
                </select>
                <label for="net" class="form-label text-end px-3">Chọn trạng thái</label>
              </div>
              <div class="mb-3 d-flex justify-content-start align-items-center">
                <input class="form-control" type="date" v-model="params.start">
                <label for="start" class="form-label text-end px-3">Chọn ngày bắt đầu</label>
              </div>
              <div class="mb-3 d-flex justify-content-start align-items-center">
                <input class="form-control" type="date" v-model="params.end">
                <label for="end" class="form-label text-end px-3">Chọn ngày kết thúc</label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 mt-2 d-flex justify-content-center align-items-center">
          <div class="mb-3" align="center">
            <button class="btn btn-primary btn-block" type="submit" @click="() => handleFilter()">Lọc</button>
          </div>
          <div class="mb-3 mx-2" align="center">
            <button type="button" class="btn btn-danger btn-block" @click="() => handleDeleteFilter()" id="filter-delete"
                    style="opacity: 0.7;">Xoá bộ lọc
            </button>
          </div>
<!--          <div class="dropdown mb-3" align="right">-->
<!--            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"-->
<!--                    data-bs-toggle="dropdown" aria-expanded="false">-->
<!--              Xuất dữ liệu-->
<!--            </button>-->
<!--            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">-->
<!--              <li><a class="dropdown-item" href="/report/export/service-vendor">Excel</a></li>-->
<!--            </ul>-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <div>
      <Table :histories="histories" :page="params.page" :size="params.size" :countAll="countAll"/>
    </div>
  </div>
</template>
<style scoped>
ul.nav {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
}

ul.nav li {
  flex: 1;
  margin: 0;
}

.form-control {
  width: 50% !important;
}
</style>