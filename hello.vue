<template>
  <div class="procedure-config" v-title="'服务流程编排'">
    <!-- header -->
    <div class="header">
      <div class="search">
        <div class="search-div status">
          状态：
          <el-select v-model="searchStatus" placeholder="选择状态" size="mini">
            <el-option label="全部" value="all"></el-option>
            <el-option label="启用" value="logon"></el-option>
            <el-option label="禁用" value="logoff"></el-option>
          </el-select>
        </div>
        <div class="search-div level">
          服务等级：
          <el-select v-model="searchLevel" placeholder="选择服务等级" size="mini">
            <el-option label="全部" value="all"></el-option>
            <el-option label="一级" value="1"></el-option>
            <el-option label="二级" value="2"></el-option>
            <el-option label="三级" value="3"></el-option>
          </el-select>
        </div>
        <div class="search-div name">
          <el-input v-model="searchName" placeholder="请输入服务名或接入名" size="mini" clearable @keydown.enter.native="getProcedureCatalogByCondition"></el-input>
        </div>
        <div class="search-div btn" @click="getProcedureCatalogByCondition">
          <div class="iconfont iconsousuo"></div>
        </div>
      </div>
      <div class="tool">
        <el-dropdown
          class="exp btn"
          placement="bottom"
          @command="handleExpCommand"
        >
          <el-button
            plain
            size="mini"
            @click="expStandardWordAndExcel"
            :loading="expStandardWordAndExcelLoading"
            >标准导出</el-button
          >
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="expStandardWord"
              >导出word</el-dropdown-item
            >
            <el-dropdown-item command="expStandardExcel"
              >导出excel</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button class="exp btn" plain size="mini" @click="expStandardExcel" :loading="expStandardWordAndExcelLoading">标准导出</el-button> -->
        <el-button
          class="save btn"
          plain
          size="mini"
          @click="saveProcedureNow()"
          >保存</el-button
        >
        <!-- <el-button class="backup btn" plain size="mini" @click="backupProcedure" :loading="handleBackupLoading">备份</el-button> -->
        <el-button
          class="recover btn"
          plain
          size="mini"
          @click="recoverProcedure"
          >备份库</el-button
        >
        <el-button
          class="publish btn"
          size="mini"
          type="primary"
          @click="publish"
          >发布</el-button
        >
        <div class="view-change btn">
          <div v-if="viewType == 'preview'" class="design-view">
            <!-- <i class="iconfont iconbianpaishitu" style="float:left;"></i>
            <div style="float:left;margin-left:4px;color:#606266;">编排视图</div> -->
            <el-button
              type="text"
              @click="toDesign"
              :disabled="toDesignBtnDisabled"
              style="float: left; color: #606266; font-size: 12px"
              ><i
                class="iconfont iconbianpaishitu"
                style="margin-right: 4px; display: inline-block; float: left"
              ></i
              ><span
                style="
                  display: inline-block;
                  height: 16px;
                  line-height: 18px;
                  float: left;
                "
                >编排视图</span
              ></el-button
            >
          </div>
          <div v-else class="preview-view">
            <!-- <i class="iconfont icongailan" style="float:left;"></i>
            <div style="float:left;margin-left:4px;color:#606266;">概览视图</div> -->
            <el-button
              type="text"
              @click="toPreview"
              :disabled="toPreviewBtnDisabled"
              style="float: left; color: #606266; font-size: 12px"
              ><i
                class="iconfont icongailan"
                style="margin-right: 4px; display: inline-block; float: left"
              ></i
              ><span
                style="
                  display: inline-block;
                  height: 16px;
                  line-height: 18px;
                  float: left;
                "
                >概览视图</span
              ></el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- content -->
    <div class="content">
      <!-- content-left-tree -->
      <div class="content-left-tree">
        <div class="tree-tool">
          <el-tooltip content="移动目录" placement="top">
            <div
              class="bottm btn iconfont iconshangxiayidongjiantou"
              @click="openProcedureCatalogMoveDialog"
            ></div>
          </el-tooltip>
          <!-- <el-tooltip content="下移目录" placement="top">
            <div class="bottm btn iconfont iconxiayi" @click="toBottomProcedureCatalog"></div>
          </el-tooltip>
          <el-tooltip content="上移目录" placement="top">
            <div class="top btn iconfont iconshangyi" @click="toTopProcedureCatalog"></div>
          </el-tooltip> -->
          <el-tooltip content="删除目录" placement="top">
            <div
              class="del btn iconfont iconicon_shanchu"
              @click="delProcedureCatalog"
            ></div>
          </el-tooltip>
          <el-tooltip
            content="编辑目录"
            placement="top"
            v-if="Object.keys(treeClickData).length > 0"
          >
            <div
              class="add btn iconfont iconicon_bianji"
              @click="editProcedureCatalog"
              v-if="Object.keys(treeClickData).length > 0"
            ></div>
          </el-tooltip>
          <el-tooltip content="创建目录" placement="top">
            <div
              class="add btn iconfont iconicon_addd1"
              @click="addProcedureCatalog"
            ></div>
          </el-tooltip>
        </div>
        <div class="tree-content">
          <vuescroll :ops="scrolloperation" ref="procedureCatalogTreeScroll">
            <el-tree
              ref="procedureCatalogTree"
              id="treeDome"
              v-loading="procedureCatalogTreeLoading"
              :data="procedureCatalogTreeData"
              @node-click="getProcedureList"
              node-key="id"
              default-expand-all
              :highlight-current="true"
              empty-text=""
              :indent="8"
              style="height: 100%"
            >
              <div class="custom-tree-node" slot-scope="{ node, data }">
                <div class="icon-label folder" v-show="node.expanded">
                  <i class="iconfont icongxwdjs_folder_open"></i>{{ data.name }}
                </div>
                <div class="icon-label folder" v-show="!node.expanded">
                  <i class="iconfont icongxwdjs_folder_normal"></i
                  >{{ data.name }}
                </div>
                <!-- <div v-if="(!data.isDbclick)||(data.isDbclick == 'no')">
                  <div class="icon-label folder" v-show="node.expanded"><i class="iconfont icongxwdjs_folder_open"></i><span @dblclick.stop="dbclickTree(data)">{{ data.name }}</span></div>
                  <div class="icon-label folder" v-show="!node.expanded"><i class="iconfont icongxwdjs_folder_normal"></i><span @dblclick.stop="dbclickTree(data)">{{ data.name }}</span></div>
                </div> -->
                <!-- <div v-if="data.isDbclick&&data.isDbclick=='yes'">
                  <div class="icon-label folder" v-show="node.expanded"><i class="iconfont icongxwdjs_folder_open"></i><el-input :id='data.id' :autofocus='true' :class="'treeInput dome'+data.id" @blur='treeInputBlur(data)' v-model="data.name" size="mini"></el-input></div>
                  <div class="icon-label folder" v-show="!node.expanded"><i class="iconfont icongxwdjs_folder_normal"></i><el-input :id='data.id' :autofocus='true' :class="'treeInput dome'+data.id" @blur='treeInputBlur(data)' v-model="data.name" size="mini"></el-input></div>
                </div> -->
                <!-- <div class="expand-icon expand" v-if="node.childNodes.length!=0 && node.expanded"><i class="iconfont iconjiantou-bottom"></i></div>
                <div class="expand-icon expand" v-if="node.childNodes.length!=0 && !node.expanded"><i class="iconfont iconjiantou-left"></i></div> -->
              </div>
            </el-tree>
          </vuescroll>
        </div>
      </div>
      <!-- content-right-design-preview -->
      <div class="content-right-design-preview">
        <!-- preview -->
        <div class="preview" v-show="viewType == 'preview'">
          <div class="sort-title">
            <div class="sort-title-con">
              排序：
              <el-select
                class="sort-dim"
                v-model="sortDim"
                placeholder="排序口径"
                size="mini"
                @change="changeSortDimType"
              >
                <el-option label="按名称" value="byName"></el-option>
                <el-option label="按等级" value="byLevel"></el-option>
                <el-option label="按更新时间" value="byUpdateTime"></el-option>
                <el-option label="按调用量" value="byInvokeCount"></el-option>
              </el-select>
              <el-select
                class="sort-type"
                v-model="sortType"
                placeholder="排序方式"
                size="mini"
                @change="changeSortDimType"
              >
                <el-option label="正序" value="asc"></el-option>
                <el-option label="倒序" value="desc"></el-option>
              </el-select>
            </div>
          </div>
          <div class="procedure-box" v-loading="procedureBoxLoading">
            <ul class="procedure-ul">
              <vuescroll :ops="scrolloperation">
                <li
                  v-for="item in procedureList"
                  :key="item.id"
                  :class="
                    'procedure-li ' + (item.open == 'true' ? '' : 'logoff')
                  "
                  @mouseenter="showProcedureTool($event)"
                  @mouseleave="hideProcedureTool($event)"
                  @click="toggleActiveProcedureLi($event)"
                >
                  <div class="li-title">
                    <div class="title-label">
                      <div class="procedure-name">{{ item.title }}</div>
                      <div class="procedure-code">{{ item.inputName }}</div>
                    </div>
                    <el-popover
                      placement="bottom-end"
                      width="168"
                      trigger="hover"
                    >
                      <div
                        class="level-change-con one"
                        @click="changeProcedureLevel('1', item)"
                      >
                        一级
                      </div>
                      <div
                        class="level-change-con two"
                        @click="changeProcedureLevel('2', item)"
                      >
                        二级
                      </div>
                      <div
                        class="level-change-con three"
                        @click="changeProcedureLevel('3', item)"
                      >
                        三级
                      </div>
                      <div
                        class="title-level"
                        slot="reference"
                        v-if="item.serviceLevel == '1'"
                        style="background: #197ade"
                      >
                        {{ item.levelName }}
                      </div>
                      <div
                        class="title-level"
                        slot="reference"
                        v-if="item.serviceLevel == '2'"
                        style="background: #0d99e4"
                      >
                        {{ item.levelName }}
                      </div>
                      <div
                        class="title-level"
                        slot="reference"
                        v-if="item.serviceLevel == '3'"
                        style="background: #19b7de"
                      >
                        {{ item.levelName }}
                      </div>
                    </el-popover>
                  </div>
                  <div class="li-pre-con">
                    <procedure-thumb-main
                      ref="procedureThumbMain"
                      :containerId="item.id"
                      :designPanelBackground="'#fff'"
                      :steps="item.steps"
                    ></procedure-thumb-main>
                  </div>
                  <div class="li-tool-con">
                    <ul class="tool-ul">
                      <li
                        class="tool-li forbid"
                        @click.stop="toggleForbidProcedure(item)"
                      >
                        <div
                          v-show="item.open == 'true'"
                          class="iconfont iconjinyong"
                        ></div>
                        <div
                          v-show="item.open == 'false'"
                          class="iconfont iconicon_qidong"
                          style="font-size: 14px"
                        ></div>
                        <div v-show="item.open == 'true'">禁用</div>
                        <div v-show="item.open == 'false'">启用</div>
                      </li>
                      <li
                        class="tool-li del"
                        @click.stop="openDelProcedureDialog(item)"
                      >
                        <div class="iconfont iconicon_shanchu"></div>
                        <div>删除</div>
                      </li>
                      <li
                        class="tool-li copy"
                        @click.stop="openCopyProcedureDialog(item)"
                      >
                        <div class="iconfont iconfuzhi"></div>
                        <div>复制</div>
                      </li>
                      <li
                        class="tool-li monitor"
                        @click.stop="toProcedureMonitor(item)"
                      >
                        <div class="iconfont iconjiankong"></div>
                        <div>监控</div>
                      </li>
                      <li
                        class="tool-li test"
                        @click.stop="toProcedureTest(item)"
                      >
                        <div class="iconfont iconceshi"></div>
                        <div>测试</div>
                      </li>
                      <li
                        class="tool-li edit"
                        @click.stop="toProcedureEdit(item)"
                      >
                        <div
                          class="iconfont iconicon_bianji"
                          style="font-size: 15px"
                        ></div>
                        <div>编辑</div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="procedure-li add" @click="toProcedureDesignAdd">
                  <div class="content">
                    <div class="add-icon iconfont iconicon_addd1"></div>
                    <div class="add-label">新增</div>
                  </div>
                </li>
              </vuescroll>
            </ul>
          </div>
        </div>
        <!-- design -->
        <div class="design" v-show="viewType == 'design'">
          <procedure-design
            ref="procedureDesign"
            :containerId="procedureDesignContainerId"
            :searchFlag="1"
            :searchStepId="searchStepId"
            :stepCanCheck="false"
            :stepMonitor="false"
            :designPanelBackground="'#fbfbfb'"
            @initFinish="initFinish"
          ></procedure-design>
        </div>
      </div>
    </div>
    <!-- dialog-catalog-add -->
    <el-dialog
      v-dialogDrag
      class="dialog-catalog-add"
      title="创建目录"
      :visible.sync="addProcedureCatalogVisible"
      width="450px"
    >
      <div class="content">
        <el-form
          :rules="addCatalogFormRules"
          :model="addCatalogData"
          ref="addCatalogForm"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="根目录：">
            <div class="procedure-catalog-is-root box">
              <el-switch
                class="procedure-catalog-is-root-switch"
                v-model="addCatalogData.procedureCatalogIsRoot"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </div>
          </el-form-item>
          <el-form-item
            class="is-required"
            prop="addProcedureCatalogName"
            label="目录名称："
          >
            <div class="procedure-catalog-code-con box">
              <el-input
                class="procedure-catalog-code"
                placeholder="请输入目录名"
                v-model="addCatalogData.addProcedureCatalogName"
                size="mini"
              ></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="addProcedureCatalogConfirm"
          size="mini"
          >确 定</el-button
        >
        <el-button @click="addProcedureCatalogCancel" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- dialog-catalog-del -->
    <el-dialog
      class="dialog-catalog-del"
      :visible.sync="delProcedureCatalogVisible"
      width="400px"
    >
      <div class="content">确认删除该服务流程目录及其所有流程吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="delProcedureCatalogConfirm"
          size="mini"
          >确 定</el-button
        >
        <el-button @click="delProcedureCatalogCancel" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- dialog-save -->
    <!-- <el-dialog class="dialog-save" :visible.sync="saveProcedureVisible" width="400px">
      <div class="content">确认保存服务流程编排吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProcedureVisible = false" size="mini">确 定</el-button>
        <el-button @click="saveProcedureVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog> -->
    <!-- dialog-forbid -->
    <el-dialog
      class="dialog-forbid"
      :visible.sync="forbidProcedureVisible"
      width="400px"
    >
      <div class="content">确认禁用该服务流程吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="forbidProcedure" size="mini"
          >确 定</el-button
        >
        <el-button @click="forbidProcedureVisible = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- dialog-del -->
    <el-dialog
      class="dialog-del"
      :visible.sync="delProcedureVisible"
      width="400px"
    >
      <div class="content">
        该服务流程<span style="color: #ff7200">{{ recentTime }}</span
        ><span>{{ recentExist }}</span
        >调用记录，
      </div>
      <div class="content">确认删除该服务流程吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delProcedure" size="mini"
          >确 定</el-button
        >
        <el-button @click="delProcedureVisible = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- dialog-copy -->
    <el-dialog
      v-dialogDrag
      class="dialog-copy"
      title="服务复制"
      :visible.sync="copyProcedureVisible"
      width="450px"
    >
      <div class="content">
        <el-form
          label-width="140px"
          :model="copyProcedureData"
          :rules="copyProcedureDataRules"
          ref="copyProcedureForm"
        >
          <div class="procedure-name-con">
            <!-- <div class="label">服务名称：</div> -->
            <el-form-item
              label="服务名称："
              class="is-required label"
              prop="copyProcedureName"
            >
              <el-input
                class="procedure-name-input value"
                placeholder="请输入服务名称"
                v-model="copyProcedureData.copyProcedureName"
                size="mini"
              ></el-input>
            </el-form-item>
          </div>
          <div class="procedure-code-con">
            <!-- <div class="label">服务接入名：</div> -->
            <el-form-item
              label="服务接入名："
              class="is-required label"
              prop="copyInputName"
            >
              <el-input
                class="procedure-code value"
                placeholder="请输入服务接入名"
                v-model="copyProcedureData.copyInputName"
                size="mini"
              ></el-input>
            </el-form-item>
          </div>
          <div class="procedure-is-use-con">
            <!-- <div class="label">启动：</div> -->
            <el-form-item label="启动：" class="label">
              <el-switch
                class="procedure-is-use-switch value"
                v-model="copyProcedureData.copyProcedureIsUse"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </div>
          <div class="procedure-level-con">
            <!-- <div class="label">服务等级：</div> -->
            <el-form-item label="服务等级：" class="label">
              <el-radio-group
                class="procedure-level-con value"
                v-model="copyProcedureData.copyProcedureLevel"
              >
                <el-radio label="1">一级</el-radio>
                <el-radio label="2">二级</el-radio>
                <el-radio label="3">三级</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="copyProcedure" size="mini"
          >确 定</el-button
        >
        <el-button @click="copyProcedureVisible = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- dialog-backup -->
    <!-- <el-dialog class="dialog-backup" title="备份" :visible.sync="backupProcedureVisible" width="500px">
      <div class="content">
        <div class="backup-handle backup-type">
          手动备份：
          <el-button class="backup-handle-btn" type="primary" size="mini" @click="handleBackup" :loading="handleBackupLoading">手动备份</el-button>
        </div>
        <div class="backup-time backup-type" style="height:68px;">
          定时备份：
          <el-switch class="backup-time-switch" v-model="backupTimeSwitch" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          每
          <el-input-number class="backup-num" v-model="backupNum" size="mini" :min="1" :max="100"></el-input-number>
          <el-select class="backup-date-type" v-model="backupDateType" size="mini">
            <el-option label="小时" value="0"></el-option>
            <el-option label="天" value="1"></el-option>
            <el-option label="周" value="2"></el-option>
            <el-option label="月" value="3"></el-option>
          </el-select>
          <el-button type="primary" @click="changeQuartzConfigBackup" size="mini">确 定</el-button>
        </div>
      </div>
    </el-dialog> -->
    <!-- dialog-recover -->
    <el-dialog
      v-dialogDrag
      class="dialog-recover"
      title="备份库"
      :visible.sync="recoverProcedureVisible"
      width="700px"
    >
      <div class="content">
        <div class="search-title">
          类型：
          <el-select
            class="search-backup-type"
            v-model="searchBackupType"
            size="mini"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option label="发布备份" value="publish"></el-option>
            <el-option label="导入备份" value="import"></el-option>
            <el-option label="手动备份" value="handle"></el-option>
            <el-option label="定时备份" value="quartz"></el-option>
          </el-select>
          <el-date-picker
            class="search-backup-time"
            v-model="searchBackupTime"
            size="mini"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary" @click="searchBackupRecord" size="mini"
            >查询</el-button
          >
        </div>
        <div class="search-grid">
          <el-table
            :data="backupTableData"
            style="width: 100%"
            :header-cell-style="{ background: '#eee', color: '#5f5f5f' }"
            :header-row-style="{ background: '#eee' }"
            height="calc(100% - 30px)"
            v-loading="backupTableLoading"
          >
            <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column
              label="文件名"
              prop="fileName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="大小" width="80" prop="fileSize">
            </el-table-column>
            <el-table-column label="备份时间" width="160" prop="backupTime">
            </el-table-column>
            <el-table-column label="备份类型" width="100" prop="backupTypeName">
            </el-table-column>
            <el-table-column type="expand" label="操作">
              <template slot-scope="props" v-if="props.row.msgMap">
                <div
                  v-for="(item, index) in props.row.msgMap.rows"
                  :key="index"
                >
                  {{ item.state }} {{ item.text }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              label="恢复"
              width="60"
              align="center"
            >
              <template slot-scope="scope">
                <i
                  class="iconfont iconchexiao"
                  style="color: #23aeff; cursor: pointer"
                  :backId="scope.row.backId"
                  @click="recoverBak(scope.row)"
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- dialog-move -->
    <el-dialog
      v-dialogDrag
      class="dialog-move"
      title="移动目录"
      :visible.sync="moveProcedureCatalogVisible"
      width="500px"
    >
      <div class="content" style="height: 300px">
        <vuescroll :ops="scrolloperation">
          <el-tree
            ref="procedureCatalogMoveTree"
            :data="procedureCatalogMoveTreeData"
            node-key="id"
            default-expand-all
            :highlight-current="true"
            :indent="8"
            style="height: 100%"
            draggable
          >
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <div class="icon-label folder" v-show="node.expanded">
                <i class="iconfont icongxwdjs_folder_open"></i>{{ data.name }}
              </div>
              <div class="icon-label folder" v-show="!node.expanded">
                <i class="iconfont icongxwdjs_folder_normal"></i>{{ data.name }}
              </div>
            </div>
          </el-tree>
        </vuescroll>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="moveProcedureCatalog" size="mini"
          >确 定</el-button
        >
        <el-button @click="moveProcedureCatalogVisible = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- dialog-publish -->
    <el-dialog
      class="dialog-publish"
      :visible.sync="publishVisible"
      width="400px"
    >
      <div class="content">
        <!-- <div class="desc">发布服务流程会同步发布所有服务组件变更，变更如下：</div>
        <div class="procedure-update-con">
          <div class="update-con-title">服务流程：</div>
          <el-table :data="publishProcedureTableData" style="width: 100%" :header-cell-style="{background: '#eee',color:'#5f5f5f'}" :header-row-style="{background: '#eee'}" height="100%">
            <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="流程名" prop="name">
            </el-table-column>
            <el-table-column label="接入名" width="140" prop="inputName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="变更类型" width="100" prop="updateType">
            </el-table-column>
            <el-table-column label="变更时间" width="160" prop="updateTime">
            </el-table-column>
          </el-table>
        </div>
        <div class="service-update-con">
          <div class="update-con-title">服务组件：</div>
          <el-table :data="publishServiceTableData" style="width: 100%" :header-cell-style="{background: '#eee',color:'#5f5f5f'}" :header-row-style="{background: '#eee'}" height="100%">
            <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="服务名" prop="name">
            </el-table-column>
            <el-table-column label="所属域" width="140" prop="belongDomain">
            </el-table-column>
            <el-table-column label="变更类型" width="100" prop="updateType">
            </el-table-column>
            <el-table-column label="变更时间" width="160" prop="updateTime">
            </el-table-column>
          </el-table>
        </div> -->
        是否将变更内容发布到集群？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="publishConfirm" size="mini"
          >确 定</el-button
        >
        <el-button @click="publishVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>
    <div
      v-show="isPublishing"
      class="progress-con"
      style="
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.1);
      "
    >
      <el-progress
        :text-inside="true"
        :show-text="false"
        :stroke-width="22"
        :percentage="percentage"
        style="
          width: 400px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -200px;
          margin-top: -11px;
        "
      ></el-progress>
      <div
        style="
          width: 400px;
          height: 22px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -200px;
          margin-top: -11px;
          text-align: center;
          line-height: 22px;
          color: #333;
          font-size: 13px;
        "
      >
        正在发布到集群
      </div>
    </div>

    <el-dialog
      v-dialogDrag
      title="编辑目录"
      :visible.sync="editDialog"
      width="440px"
    >
      <div class="editDialogBox">
        <span>名称：</span>
        <el-input v-model="treeClickData.name" size="mini"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editNameYes" size="mini"
          >确 定</el-button
        >
        <el-button @click="(editDialog = false), (editName = '')" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import utils from '../../lib/utils';
import vuescroll from 'vuescroll';
import api from '../../request/api';
import procedureDesign from '../../components/procedureDesign';
import procedureThumbMain from '../../components/procedureThumbMain';
import axios from 'axios';

export default {
  name: 'procedureConfig',
  components: {
    vuescroll: vuescroll,
    'procedure-design': procedureDesign,
    'procedure-thumb-main': procedureThumbMain,
  },
  data() {
    return {
      scrolloperation: {
        // 滚动条配置项
        bar: {
          size: '6px',
          opacity: 0.8,
          keepShow: true,
          background: '#bde6ff',
          onlyShowBarOnScroll: false,
        },
        rail: {
          size: '6px',
        },
      },
      searchStatus: 'all', // 默认查全部状态
      searchLevel: 'all', // 默认查全部等级
      searchName: '', // 服务名和接入名
      viewType: 'preview', // 默认概览视图
      sortDim: 'byName',
      sortType: 'asc',
      addProcedureCatalogVisible: false,
      addCatalogData: {
        procedureCatalogIsRoot: false,
        addProcedureCatalogName: '',
      },
      delProcedureCatalogVisible: false,
      // saveProcedureVisible: false,
      isChange: false,
      // backupProcedureVisible: false,
      forbidProcedureVisible: false,
      delProcedureVisible: false,
      copyProcedureVisible: false,
      moveProcedureCatalogVisible: false,
      copyProcedureData: {
        copyProcedureName: '',
        copyInputName: '',
        copyProcedureIsUse: true,
        copyProcedureLevel: '1',
      },
      copyProcedureDataRules: {
        copyProcedureName: [
          { required: true, message: '请输入服务名称', trigger: 'blur' },
        ],
        copyInputName: [
          { required: true, message: '请输入服务接入名', trigger: 'blur' },
        ],
      },
      addCatalogFormRules: {
        addProcedureCatalogName: [
          { required: true, message: '请输入目录名', trigger: 'blur' },
          { min: 0, max: 50, message: '超出字符长度字符：50', trigger: 'blur' },
        ],
      },
      publishVisible: false,
      backupTimeSwitch: false,
      backupNum: 1,
      backupDateType: '0',
      recoverProcedureVisible: false,
      searchBackupType: 'all',
      searchBackupTime: [
        utils.$dateObj.toDate(utils.$dateObj.minusYears(new Date(), 1)),
        new Date(),
      ],
      procedureCatalogTreeLoading: false,
      procedureCatalogTreeData: [], // 流程目录树
      procedureCatalogMoveTreeData: [], // 流程目录移动树
      procedureCatalogTreeSelectNodeData: null,
      procedureList: [], // 某个目录下的流程接入点集合
      selectProcedureCatalogAllStepsData: [], // 某个目录下的所有流程步骤集合
      selectProcedureCatalogFlowId: null,
      selectProcedureCatalogFlowName: null,
      searchStepId: '',
      procedureDesignContainerId: 'design',
      levelMap: { 1: '一级', 2: '二级', 3: '三级' },
      recentTime: '当天',
      recentExist: '没有',
      logoffProcedureItem: null,
      delProcedureItem: null,
      copyProcedureItem: null,
      backupTableLoading: false,
      backupTableData: [],
      backupTypeMap: {
        handle: '手动备份',
        quartz: '定时备份',
        publish: '发布备份',
        import: '导入备份',
      },
      isPublishing: false,
      percentage: 0,
      procedureBoxLoading: true,
      expStandardWordAndExcelLoading: false, // 标准导出按钮加载动画
      handleBackupLoading: false, //手动备份按钮加载动画
      treeClickData: {},
      editName: '',
      editDialog: false,
      toDesignBtnDisabled: false,
      toPreviewBtnDisabled: false,
    };
  },
  mounted() {
    var ths = this;
    ths.procedureCatalogTreeLoading = true;
    // 加载左边的流程目录树
    api.procedureConfig
      .getProcedureCatalog({
        searchStatus: ths.searchStatus,
        searchLevel: ths.searchLevel,
        searchName: ths.searchName.trim(),
      })
      .then((res) => {
        if (res.meta.statusCode == 200) {
          ths.procedureCatalogTreeData = res.data;
          // 选中第一个目录
          ths.$nextTick(function () {
            if (res.data[0]) {
              ths.$refs.procedureCatalogTree.setCurrentKey(res.data[0].id);
              ths.getProcedureList(res.data[0]);
              ths.procedureCatalogTreeSelectNodeData = res.data[0];
            } else {
              ths.procedureList = [];
              ths.selectProcedureCatalogAllStepsData = [];
              ths.selectProcedureCatalogFlowId = null;
              ths.selectProcedureCatalogFlowName = null;
            }
          });
        } else {
          ths.$message({
            type: 'error',
            message: res.meta.message,
          });
        }
        ths.procedureCatalogTreeLoading = false;
      })
      .catch((err) => {
        ths.$message({
          type: 'error',
          message: err,
        });
        ths.procedureCatalogTreeLoading = false;
      });
  },
  methods: {
    handleExpCommand(command) {
      if (command == 'expStandardWord') {
        this.expStandardWord();
      } else if (command == 'expStandardExcel') {
        this.expStandardExcel();
      }
    },
    editProcedureCatalog() {
      this.editDialog = true;
    },
    editNameYes() {
      api.procedureConfig
        .procedureCatalogRename({
          id: this.treeClickData.id,
          name: this.treeClickData.name,
        })
        .then((res) => {
          if (res.meta.statusCode === '200') {
            this.lookForDigui(
              this.procedureCatalogTreeData,
              this.treeClickData.id,
              this.treeClickData.name
            );
            this.editDialog = false;
            this.$message({
              type: 'success',
              message: '重命名成功',
            });
          }
        });
    },
    lookForDigui(data, id, name) {
      data.some((item, key) => {
        if (item.id == id) {
          data[key].name = name;
        } else {
          if (item.children && item.children.length > 0) {
            this.lookForDigui(item.children, id, name);
          }
        }
      });
    },
    // dbclickTree(data){
    //   console.log(data)
    //   // data.isDbclick = 'yes'
    //   this.$set(data,'isDbclick','yes')
    //   this.$nextTick(()=>{
    //     var boxWidth = document.querySelector('.tree-content').clientWidth
    //     var leftWidth = document.querySelector('.dome'+data.id).offsetLeft
    //     document.querySelector('.dome'+data.id).style.width = ((boxWidth - leftWidth-5)+'px')
    //     document.querySelector('.dome'+data.id+' input').focus()
    //   })
    // },
    // treeInputBlur(data){
    //   // data.isDbclick = 'no'
    //   this.$set(data,'isDbclick','no')
    //   console.log()
    // },
    // changeQuartzConfigBackup() {
    //   var ths = this;
    //   api.procedureConfig.changeQuartzConfigBackup({ switchFlag: false, cron: "" }).then((res) => {
    //     if (res.meta.statusCode == 200) {

    //     } else {
    //       ths.$message({
    //         type: 'error',
    //         message: res.meta.message
    //       });
    //     }
    //     ths.backupProcedureVisible = false;
    //   }).catch((err) => {
    //     ths.$message({
    //       type: 'error',
    //       message: err
    //     });
    //   });
    // },
    handleBackup() {
      var ths = this;
      ths.handleBackupLoading = true;
      api.procedureConfig
        .handleBackup()
        .then((res) => {
          if (res.meta.statusCode == 200) {
            ths.$message({
              type: 'success',
              message: '备份成功',
            });
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
          // ths.backupProcedureVisible = false;
          ths.handleBackupLoading = false;
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
          ths.handleBackupLoading = true;
        });
    },
    toPreview() {
      var ths = this;
      ths.toDesignBtnDisabled = true;
      var flowData = ths.$refs.procedureDesign.getData();
      if (flowData.isChange == true) {
        delete flowData.isChange;
        api.procedureConfig
          .onlySaveProcedureConfig({
            id: ths.selectProcedureCatalogFlowId,
            data: JSON.stringify(flowData),
          })
          .then((res) => {
            if (res.meta.statusCode == 200) {
              ths.viewType = 'preview';
              // 选中当前流程目录
              ths.$nextTick(function () {
                ths.$refs.procedureCatalogTree.setCurrentKey(
                  ths.procedureCatalogTreeSelectNodeData.id
                );
                ths.getProcedureList(ths.procedureCatalogTreeSelectNodeData);
              });
            } else {
              ths.$message({
                type: 'error',
                message: res.meta.message,
              });
            }
            setTimeout(function () {
              ths.$nextTick(function () {
                ths.toDesignBtnDisabled = false;
              });
            }, 300);
          })
          .catch((err) => {
            ths.$message({
              type: 'error',
              message: err,
            });
            setTimeout(function () {
              ths.$nextTick(function () {
                ths.toDesignBtnDisabled = false;
              });
            }, 300);
          });
      } else {
        ths.viewType = 'preview';
        // 选中当前流程目录
        ths.$nextTick(function () {
          ths.$refs.procedureCatalogTree.setCurrentKey(
            ths.procedureCatalogTreeSelectNodeData.id
          );
          ths.getProcedureList(ths.procedureCatalogTreeSelectNodeData);
        });
        setTimeout(function () {
          ths.$nextTick(function () {
            ths.toDesignBtnDisabled = false;
          });
        }, 300);
      }
    },
    toDesign() {
      var ths = this;
      ths.toPreviewBtnDisabled = true;
      ths.viewType = 'design';
      ths.procedureDesignSetData();
      // setTimeout(function () {
      //   ths.$nextTick(function () {
      //     ths.toPreviewBtnDisabled = false;
      //   });
      // }, 300);
    },
    initFinish() {
      var ths = this;
      setTimeout(function () {
        ths.$nextTick(function () {
          ths.toPreviewBtnDisabled = false;
        });
      }, 300);
    },
    procedureDesignSetData() {
      var ths = this;
      ths.procedureList = [];
      ths.$nextTick(function () {
        ths.$refs.procedureDesign.setData({
          id: utils.clone(ths.selectProcedureCatalogFlowId),
          name: utils.clone(ths.selectProcedureCatalogFlowName),
          steps: utils.clone(ths.selectProcedureCatalogAllStepsData),
          containerId: 'design',
        });
      });
    },
    changeSortDimType() {
      this.procedureList = this.sortProcedureList(this.procedureList);
    },
    sortProcedureList(data) {
      if (this.sortDim == 'byName') {
        data.sort(this.sortFnByName);
      }
      if (this.sortDim == 'byLevel') {
        data.sort(this.sortFnByLevel);
      }
      if (this.sortDim == 'byUpdateTime') {
        data.sort(this.sortFnByUpdateTime);
      }
      if (this.sortDim == 'byInvokeCount') {
        data.sort(this.sortFnByInvokeCount);
      }
      return data;
    },
    sortFnByName(a, b) {
      var aName = a.title;
      var bName = b.title;
      if (aName > bName) {
        if (this.sortType == 'asc') {
          return 1;
        } else {
          return -1;
        }
      } else if (aName == bName) {
        return 0;
      } else {
        if (this.sortType == 'asc') {
          return -1;
        } else {
          return 1;
        }
      }
    },
    sortFnByLevel(a, b) {
      var aServiceLevel = a.serviceLevel;
      var bServiceLevel = b.serviceLevel;
      if (aServiceLevel > bServiceLevel) {
        if (this.sortType == 'asc') {
          return 1;
        } else {
          return -1;
        }
      } else if (aServiceLevel == bServiceLevel) {
        return 0;
      } else {
        if (this.sortType == 'asc') {
          return -1;
        } else {
          return 1;
        }
      }
    },
    sortFnByUpdateTime(a, b) {
      var aUpdateTime = a.updateTime;
      var bUpdateTime = b.updateTime;
      if (aUpdateTime > bUpdateTime) {
        if (this.sortType == 'asc') {
          return 1;
        } else {
          return -1;
        }
      } else if (aUpdateTime == bUpdateTime) {
        return 0;
      } else {
        if (this.sortType == 'asc') {
          return -1;
        } else {
          return 1;
        }
      }
    },
    sortFnByInvokeCount(a, b) {
      var aInvokeCount = a.ssMonitor == null ? '0' : a.ssMonitor.PRONUM || '0';
      var bInvokeCount = b.ssMonitor == null ? '0' : b.ssMonitor.PRONUM || '0';
      if (aInvokeCount > bInvokeCount) {
        if (this.sortType == 'asc') {
          return 1;
        } else {
          return -1;
        }
      } else if (aInvokeCount == bInvokeCount) {
        return 0;
      } else {
        if (this.sortType == 'asc') {
          return -1;
        } else {
          return 1;
        }
      }
    },
    setArgsValue(key, value, data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].key == key) {
          data[i].value = value;
        }
      }
    },
    changeProcedureLevel(serviceLevel, item) {
      var ths = this;
      api.procedureConfig
        .changeProcedureArgsAttr({
          flowConfigId: ths.procedureCatalogTreeSelectNodeData.id,
          stepId: item.id,
          type: 'serviceLevel',
          value: serviceLevel,
        })
        .then((res) => {
          if (res.meta.statusCode == 200) {
            ths.isChange = true; // 做过修改
            item.serviceLevel = serviceLevel;
            item.levelName = ths.levelMap[item.serviceLevel] || '一级';
            for (
              var i = 0;
              i < ths.selectProcedureCatalogAllStepsData.length;
              i++
            ) {
              if (ths.selectProcedureCatalogAllStepsData[i].id == item.id) {
                ths.setArgsValue(
                  'serviceLevel',
                  serviceLevel,
                  ths.selectProcedureCatalogAllStepsData[i].args
                );
                break;
              }
            }
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    toggleActiveProcedureLi(event) {
      if (utils.$jQuery.hasClass(event.currentTarget, 'select')) {
        utils.$jQuery.removeClass(event.currentTarget, 'select');
      } else {
        var procedureLi = utils.$jQuery._$('.procedure-li');
        for (var i = 0; i < procedureLi.length; i++) {
          utils.$jQuery.removeClass(procedureLi[i], 'select');
          if (procedureLi[i].getElementsByClassName('li-tool-con').length > 0)
            procedureLi[i].getElementsByClassName(
              'li-tool-con'
            )[0].style.display = 'none';
        }
        utils.$jQuery.addClass(event.currentTarget, 'select');
        this.showProcedureTool(event);
      }
    },
    toProcedureDesignAdd() {
      this.viewType = 'design';
      if (this.$refs.procedureDesign.selectStep) {
        this.$refs.procedureDesign.selectStep.unselect();
      }
      this.procedureDesignSetData();
    },
    delProcedureCatalogById(nodeId, data) {
      // 应该要递归删除
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == nodeId) {
          data.splice(i, 1);
          break;
        }
        if (data[i].children && data[i].children.length > 0) {
          this.delProcedureCatalogById(nodeId, data[i].children);
        }
      }
    },
    delProcedureCatalogConfirm() {
      var ths = this;
      var flowConfigIds = [];
      ths.getAllFlowConfigIds(
        [ths.procedureCatalogTreeSelectNodeData],
        flowConfigIds
      );
      api.procedureConfig
        .delProcedureCatalog(flowConfigIds)
        .then((res) => {
          if (res.meta.statusCode == 200) {
            // 删除树的节点
            ths.delProcedureCatalogById(
              ths.procedureCatalogTreeSelectNodeData.id,
              ths.procedureCatalogTreeData
            );
            ths.$message.success('删除流程目录成功');
            ths.delProcedureCatalogVisible = false;
            ths.saveProcedureNow(false);
            // 选中第一个目录
            ths.$nextTick(function () {
              ths.$refs.procedureCatalogTree.setCurrentKey(
                ths.procedureCatalogTreeData[0].id
              );
              ths.getProcedureList(ths.procedureCatalogTreeData[0]);
              ths.procedureCatalogTreeSelectNodeData =
                ths.procedureCatalogTreeData[0];
            });
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    delProcedureCatalogCancel() {
      this.delProcedureCatalogVisible = false;
    },
    addProcedureCatalogToChildrenRecursion(dataList, nodeData, parentId) {
      for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].id == parentId) {
          dataList[i].children.push(nodeData);
          break;
        } else if (dataList[i].children && dataList[i].children.length > 0) {
          this.addProcedureCatalogToChildrenRecursion(
            dataList[i].children,
            nodeData,
            parentId
          );
        }
      }
    },
    addProcedureCatalogFn(parentId) {
      var ths = this;
      api.procedureConfig
        .addProcedureCatalog([
          ths.addCatalogData.addProcedureCatalogName,
          parentId,
        ])
        .then((res) => {
          if (res.meta.statusCode == 200) {
            if (parentId != '') {
              // 添加为子目录
              ths.addProcedureCatalogToChildrenRecursion(
                ths.procedureCatalogTreeData,
                res.data,
                parentId
              );
            } else {
              //添加为根目录
              ths.procedureCatalogTreeData = ths.procedureCatalogTreeData.concat(
                [res.data]
              );
            }
            // 添加之后选中
            ths.$nextTick(function () {
              ths.$refs.procedureCatalogTree.setCurrentKey(res.data.id);
              ths.getProcedureList(res.data);
              ths.procedureCatalogTreeSelectNodeData = res.data;
            });
            ths.$message.success('添加流程目录成功');
            ths.addProcedureCatalogVisible = false;
            ths.saveProcedureNow(false);
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    addProcedureCatalogConfirm() {
      var ths = this;
      ths.$refs.addCatalogForm.validate((valid) => {
        if (valid) {
          if (ths.addCatalogData.procedureCatalogIsRoot) {
            // 如果是根目录，直接添加
            ths.addProcedureCatalogFn('');
          } else {
            // 如果非根目录，要传递parentId
            ths.addProcedureCatalogFn(
              ths.procedureCatalogTreeSelectNodeData.id
            );
          }
        }
      });
    },
    addProcedureCatalogCancel() {
      this.addProcedureCatalogVisible = false;
    },
    addProcedureCatalog() {
      this.addProcedureCatalogVisible = true;
      this.addCatalogData.procedureCatalogIsRoot = false;
      this.addCatalogData.addProcedureCatalogName = '';
    },
    delProcedureCatalog() {
      this.delProcedureCatalogVisible = true;
    },
    toTopProcedureCatalog() {
      var ths = this;
      var preSibling = ths.$refs.procedureCatalogTree.getNode(
        ths.procedureCatalogTreeSelectNodeData
      ).previousSibling;
      if (preSibling != null) {
        var nodeData = [];
        nodeData.push(ths.procedureCatalogTreeSelectNodeData);
        nodeData.push(preSibling.data);
        nodeData[0].catalogId = nodeData[0].id;
        nodeData[1].catalogId = nodeData[1].id;
        api.procedureConfig
          .procedureCatalogMove(nodeData)
          .then((res) => {
            if (res.meta.statusCode == 200 && res.data) {
              ths.changeProcedureCatalogTreeDataPosition(
                ths.procedureCatalogTreeData,
                nodeData[0].catalogId,
                nodeData[1].catalogId
              );
              ths.procedureCatalogTreeData = utils.clone(
                ths.procedureCatalogTreeData
              );
              // 选中目录
              ths.$nextTick(function () {
                ths.$refs.procedureCatalogTree.setCurrentKey(
                  ths.procedureCatalogTreeSelectNodeData.id
                );
                ths.getProcedureList(ths.procedureCatalogTreeSelectNodeData);
              });
            } else {
              ths.$message({
                type: 'error',
                message: res.meta.message,
              });
            }
          })
          .catch((err) => {
            ths.$message({
              type: 'error',
              message: err,
            });
          });
      }
    },
    toBottomProcedureCatalog() {
      var ths = this;
      var nextSibling = ths.$refs.procedureCatalogTree.getNode(
        ths.procedureCatalogTreeSelectNodeData
      ).nextSibling;
      if (nextSibling != null) {
        var nodeData = [];
        nodeData.push(ths.procedureCatalogTreeSelectNodeData);
        nodeData.push(nextSibling.data);
        nodeData[0].catalogId = nodeData[0].id;
        nodeData[1].catalogId = nodeData[1].id;
        api.procedureConfig
          .procedureCatalogMove(nodeData)
          .then((res) => {
            if (res.meta.statusCode == 200 && res.data) {
              ths.changeProcedureCatalogTreeDataPosition(
                ths.procedureCatalogTreeData,
                nodeData[0].catalogId,
                nodeData[1].catalogId
              );
              ths.procedureCatalogTreeData = utils.clone(
                ths.procedureCatalogTreeData
              );
              // 选中目录
              ths.$nextTick(function () {
                ths.$refs.procedureCatalogTree.setCurrentKey(
                  ths.procedureCatalogTreeSelectNodeData.id
                );
                ths.getProcedureList(ths.procedureCatalogTreeSelectNodeData);
              });
            } else {
              ths.$message({
                type: 'error',
                message: res.meta.message,
              });
            }
          })
          .catch((err) => {
            ths.$message({
              type: 'error',
              message: err,
            });
          });
      }
    },
    openProcedureCatalogMoveDialog() {
      this.procedureCatalogMoveTreeData = utils.clone(
        this.procedureCatalogTreeData
      );
      this.moveProcedureCatalogVisible = true;
    },
    moveProcedureCatalog() {
      var ths = this;
      var catalogArr = [];
      ths.getCatalogArrRecursion(
        ths.procedureCatalogMoveTreeData,
        catalogArr,
        ''
      );
      api.procedureConfig
        .saveProcedureCatalog(catalogArr)
        .then((res) => {
          if (res.meta.statusCode == 200) {
            ths.moveProcedureCatalogVisible = false;
            ths.$message({
              type: 'success',
              message: '移动目录成功',
            });
            // 更新原来目录树
            ths.procedureCatalogTreeData = ths.procedureCatalogMoveTreeData;
            // 选中当前流程目录
            ths.$nextTick(function () {
              ths.$refs.procedureCatalogTree.setCurrentKey(
                ths.procedureCatalogTreeSelectNodeData.id
              );
              ths.getProcedureList(ths.procedureCatalogTreeSelectNodeData);
            });
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    getCatalogArrRecursion(data, catalogArr, parentId) {
      for (var i = 0; i < data.length; i++) {
        // 修正 data 的 parentId
        data[i].parentId = parentId;
        // 拼装简单目录数据
        catalogArr.push({
          catalogId: data[i].id,
          name: data[i].text,
          parentId: parentId || '',
          sequence: i,
        });
        if (data[i].children && data[i].children.length > 0) {
          this.getCatalogArrRecursion(data[i].children, catalogArr, data[i].id);
        }
      }
    },
    changeProcedureCatalogTreeDataPosition(
      partProcedureCatalogTreeData,
      id1,
      id2
    ) {
      var index1,
        index2,
        childrens = [];
      for (var i = 0; i < partProcedureCatalogTreeData.length; i++) {
        if (partProcedureCatalogTreeData[i].children.length != 0) {
          childrens.push(partProcedureCatalogTreeData[i].children);
        }
        if (partProcedureCatalogTreeData[i].id == id1) {
          index1 = i;
        }
        if (partProcedureCatalogTreeData[i].id == id2) {
          index2 = i;
        }
      }
      if (index1 != null && index2 != null) {
        partProcedureCatalogTreeData[
          index1
        ] = partProcedureCatalogTreeData.splice(
          index2,
          1,
          partProcedureCatalogTreeData[index1]
        )[0];
      } else {
        for (var j = 0; j < childrens.length; j++) {
          this.changeProcedureCatalogTreeDataPosition(childrens[j], id1, id2);
        }
      }
    },
    getProcedureList(nodeData) {
      // 获取某个目录下所有的流程，切换目录就保存流程配置
      var ths = this;
      ths.treeClickData = JSON.parse(JSON.stringify(nodeData)); // 深度拷贝
      ths.procedureBoxLoading = true;
      ths.saveProcedure(false); // 切换目录的时候也要去保存流程配置
      var flowConfigId = nodeData.id;
      ths.procedureCatalogTreeSelectNodeData = nodeData;
      api.procedureConfig
        .getProcedureListByCondition({
          searchStatus: ths.searchStatus,
          searchLevel: ths.searchLevel,
          searchName: ths.searchName.trim(),
          flowConfigId: flowConfigId,
        })
        .then((res) => {
          if (res.meta.statusCode == 200) {
            if (res.data.flowId) {
              res.data.startSteps.map(function (item) {
                item.levelName = ths.levelMap[item.serviceLevel] || '一级';
                item.args.map(function (arg) {
                  if (arg.key == 'inputName') {
                    item.inputName = arg.value;
                    return;
                  }
                });
              });
              ths.addStepsForProcedureList(
                res.data.startSteps,
                res.data.stepGroup
              );
              ths.procedureList = ths.sortProcedureList(res.data.startSteps);
              ths.selectProcedureCatalogAllStepsData = res.data.allSteps;
              ths.selectProcedureCatalogFlowId = res.data.flowId;
              ths.selectProcedureCatalogFlowName = res.data.flowName;

              // 确认好要定位的第一个流程
              ths.searchStepId = ths.getSearchStepId(res.data.startSteps);

              // 不管为 design 还是 preview，都要重新往设计面板setData
              // ths.procedureDesignSetData();
              if (ths.viewType == 'design') {
                ths.procedureDesignSetData();
              }
            }
            ths.procedureBoxLoading = false;
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    getSearchStepId(startSteps) {
      var ths = this;
      var item = startSteps.filter(function (item) {
        var realSearchName = ths.searchName.trim();
        if (
          (item.title &&
            item.title.indexOf(realSearchName) != -1 &&
            realSearchName != '') ||
          (item.inputName &&
            item.inputName.indexOf(realSearchName) != -1 &&
            realSearchName != '')
        ) {
          return true;
        }
      });
      if (item && item.length > 0) {
        return item[0].id;
      } else {
        return '';
      }
    },
    addStepsForProcedureList(startSteps, stepGroup) {
      startSteps.map(function (item) {
        if (stepGroup && stepGroup[item.id]) {
          item.steps = stepGroup[item.id];
        } else {
          item.steps = [];
        }
      });
    },
    getAllFlowConfigIds(nodeDatas, flowConfigIds) {
      for (var i = 0; i < nodeDatas.length; i++) {
        if (flowConfigIds.indexOf(nodeDatas[i].id) == -1) {
          flowConfigIds.push(nodeDatas[i].id);
        }
        if (nodeDatas[i].children && nodeDatas[i].children.length != 0) {
          this.getAllFlowConfigIds(nodeDatas[i].children, flowConfigIds);
        }
      }
    },
    getProcedureCatalogByCondition() {
      var ths = this;
      api.procedureConfig
        .getProcedureCatalog({
          searchStatus: ths.searchStatus,
          searchLevel: ths.searchLevel,
          searchName: ths.searchName.trim(),
        })
        .then((res) => {
          if (res.meta.statusCode == 200) {
            ths.procedureCatalogTreeData = res.data;
            // 选中第一个目录
            ths.$nextTick(function () {
              if (res.data[0]) {
                ths.$refs.procedureCatalogTree.setCurrentKey(res.data[0].id);
                ths.getProcedureList(res.data[0]);
                ths.procedureCatalogTreeSelectNodeData = res.data[0];
              } else {
                ths.procedureList = [];
                ths.selectProcedureCatalogAllStepsData = [];
                ths.selectProcedureCatalogFlowId = null;
                ths.selectProcedureCatalogFlowName = null;
              }
            });
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    handleNodeClick(data, node, vueComponent) {},
    showProcedureTool(event) {
      event.currentTarget.getElementsByClassName(
        'li-tool-con'
      )[0].style.display = 'block';
    },
    hideProcedureTool(event) {
      if (!utils.$jQuery.hasClass(event.currentTarget, 'select')) {
        event.currentTarget.getElementsByClassName(
          'li-tool-con'
        )[0].style.display = 'none';
      }
    },
    expStandardWordAndExcel() {
      this.expStandardWord();
      this.expStandardExcel();
    },
    expStandardExcel() {
      var ths = this;
      ths.expStandardWordAndExcelLoading = true;
      axios({
        method: 'post',
        url: '/hai-mcentre/downLoadInterfaceExcel',
        params: { flowConfigId: ths.procedureCatalogTreeSelectNodeData.id },
        responseType: 'arraybuffer',
      })
        .then((res) => {
          if (res.status == 200) {
            var link = document.createElement('a');
            var blob = new Blob([res.data], {
              type: 'application/vnd.ms-excel',
            });
            link.style.display = 'none';
            link.href = URL.createObjectURL(blob);
            link.download = res.headers['content-disposition'].split('=')[1]; // 文件名称
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
          ths.expStandardWordAndExcelLoading = false;
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
          ths.expStandardWordAndExcelLoading = false;
        });
    },
    expStandardWord() {
      var ths = this;
      ths.expStandardWordAndExcelLoading = true;
      axios({
        method: 'post',
        url: '/hai-mcentre/downLoadInterfaceDoc',
        params: { flowConfigId: ths.procedureCatalogTreeSelectNodeData.id },
        responseType: 'arraybuffer',
      })
        .then((res) => {
          if (res.status == 200) {
            var link = document.createElement('a');
            var blob = new Blob([res.data], {
              type:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            link.style.display = 'none';
            link.href = URL.createObjectURL(blob);
            link.download = res.headers['content-disposition'].split('=')[1]; // 文件名称
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
          ths.expStandardWordAndExcelLoading = false;
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
          ths.expStandardWordAndExcelLoading = false;
        });
    },
    saveProcedureNow(showTip, callback) {
      this.isChange = true;
      this.saveProcedure(showTip, callback);
    },
    saveProcedure(showTip, callback) {
      // this.saveProcedureVisible = true;
      var ths = this;
      var procedureData = ths.$refs.procedureDesign.getData();
      if (ths.isChange == false)
        ths.isChange = procedureData ? procedureData.isChange : false;
      if (ths.viewType == 'design') {
        // 要获取设计面板的数据，然后保存配置，然后提交修改到文件
        if (ths.isChange == true) {
          // 总体是修改过的，就保存
          delete procedureData.isChange;
          api.procedureConfig
            .saveProcedure({
              id: procedureData.id,
              procedureData: JSON.stringify(procedureData),
            })
            .then((res) => {
              if (res.meta.statusCode == 200) {
                if (showTip == null || showTip == true) {
                  ths.$message({
                    type: 'success',
                    message: '流程配置保存成功',
                  });
                }
                ths.isChange = false;
                ths.$refs.procedureDesign.setChange(false);
                if (callback) {
                  callback();
                }
              } else {
                ths.$message({
                  type: 'error',
                  message: res.meta.message,
                });
              }
            })
            .catch((err) => {
              ths.$message({
                type: 'error',
                message: err,
              });
            });
        }
      } else if (ths.viewType == 'preview') {
        // 保存是直接提交修改到文件
        if (ths.isChange == true) {
          // 总体是修改过的，就保存
          api.procedureConfig
            .onlySubmitProcedureConfig()
            .then((res) => {
              if (res.meta.statusCode == 200) {
                if (showTip == null || showTip == true) {
                  ths.$message({
                    type: 'success',
                    message: '流程配置保存成功',
                  });
                }
                ths.isChange = false;
                ths.$refs.procedureDesign.setChange(false);
                if (callback) {
                  callback();
                }
              } else {
                ths.$message({
                  type: 'error',
                  message: res.meta.message,
                });
              }
            })
            .catch((err) => {
              ths.$message({
                type: 'error',
                message: err,
              });
            });
        }
      }
    },
    backupProcedure() {
      // this.backupProcedureVisible = true;
      this.handleBackup();
    },
    recoverProcedure() {
      this.recoverProcedureVisible = true;
      this.searchBackupTime = [
        utils.$dateObj.toDate(utils.$dateObj.minusYears(new Date(), 1)),
        new Date(),
      ];
      this.searchBackupRecord();
    },
    publishConfirm() {
      var ths = this;
      // 发布前，先触发保存
      ths.saveProcedureNow(false, function () {
        ths.publishVisible = false;
        ths.isPublishing = true;
        ths.percentage = 0;
        var time = setInterval(function () {
          if (ths.percentage == 100) ths.percentage = 0;
          ths.percentage = ths.percentage + 5;
        }, 500);
        api.procedureConfig
          .publish()
          .then((res) => {
            if (res.meta.statusCode == 200) {
              ths.$message({
                type: 'success',
                message: '发布成功',
              });
            } else {
              ths.$message({
                type: 'error',
                message: res.meta.message,
              });
            }
            ths.isPublishing = false;
            clearInterval(time);
          })
          .catch((err) => {
            ths.isPublishing = false;
            clearInterval(time);
            ths.$message({
              type: 'error',
              message: err,
            });
          });
      });
    },
    publish() {
      this.publishVisible = true;
    },
    searchBackupRecord() {
      var ths = this;
      ths.backupTableLoading = true;
      var searchBackupTypes = [];
      if (ths.searchBackupType == 'all') {
        searchBackupTypes = ['handle', 'quartz', 'import', 'publish'];
      } else {
        searchBackupTypes = [ths.searchBackupType];
      }
      var searchBackupStartTime = utils.formatTime2(
        ths.searchBackupTime[0],
        'yyyy-MM-dd HH:mm:ss'
      );
      var searchBackupEndTime = utils.formatTime2(
        ths.searchBackupTime[1],
        'yyyy-MM-dd HH:mm:ss'
      );
      api.procedureConfig
        .searchBackupRecord({
          backupTypes: searchBackupTypes,
          backupStartTime: searchBackupStartTime,
          backupEndTime: searchBackupEndTime,
        })
        .then((res) => {
          if (res.meta.statusCode == 200) {
            res.data.map(function (item) {
              item.backupTypeName = ths.backupTypeMap[item.backupType];
            });
            ths.backupTableData = res.data;
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
          ths.backupTableLoading = false;
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    recoverBak(data) {
      var ths = this;
      api.procedureConfig
        .recoverBak({
          fileName: data.fileName,
          updateTag: data.backupType == 'import' ? 'import' : 'publish',
        })
        .then((res) => {
          if (res.meta.statusCode == 200) {
            ths.$message({
              type: 'success',
              message: '恢复成功',
            });
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    toggleForbidProcedure(item) {
      var ths = this;
      ths.logoffProcedureItem = item;
      if (item.open == 'true') {
        ths.forbidProcedureVisible = true; // 弹出禁用确认框
      } else {
        api.procedureConfig
          .changeProcedureArgsAttr({
            flowConfigId: ths.procedureCatalogTreeSelectNodeData.id,
            stepId: ths.logoffProcedureItem.id,
            type: 'open',
            value: 'true',
          })
          .then((res) => {
            if (res.meta.statusCode == 200) {
              ths.isChange = true; // 做过修改
              ths.logoffProcedureItem.open = 'true';
              for (
                var i = 0;
                i < ths.selectProcedureCatalogAllStepsData.length;
                i++
              ) {
                if (
                  ths.selectProcedureCatalogAllStepsData[i].id ==
                  ths.logoffProcedureItem.id
                ) {
                  ths.setArgsValue(
                    'open',
                    'true',
                    ths.selectProcedureCatalogAllStepsData[i].args
                  );
                  ths.$message({
                    type: 'success',
                    message: '流程启用成功',
                  });
                  break;
                }
              }
            } else {
              ths.$message({
                type: 'error',
                message: res.meta.message,
              });
            }
          })
          .catch((err) => {
            ths.$message({
              type: 'error',
              message: err,
            });
          });
      }
    },
    forbidProcedure() {
      var ths = this;
      api.procedureConfig
        .changeProcedureArgsAttr({
          flowConfigId: ths.procedureCatalogTreeSelectNodeData.id,
          stepId: ths.logoffProcedureItem.id,
          type: 'open',
          value: 'false',
        })
        .then((res) => {
          if (res.meta.statusCode == 200) {
            ths.isChange = true; // 做过修改
            ths.logoffProcedureItem.open = 'false';
            ths.forbidProcedureVisible = false;
            for (
              var i = 0;
              i < ths.selectProcedureCatalogAllStepsData.length;
              i++
            ) {
              if (
                ths.selectProcedureCatalogAllStepsData[i].id ==
                ths.logoffProcedureItem.id
              ) {
                ths.setArgsValue(
                  'open',
                  'false',
                  ths.selectProcedureCatalogAllStepsData[i].args
                );
                ths.$message({
                  type: 'success',
                  message: '流程禁用成功',
                });
                break;
              }
            }
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    openDelProcedureDialog(item) {
      var ths = this;
      ths.delProcedureItem = item;
      ths.delProcedureVisible = true;
      api.procedureConfig
        .getProcedureSSMonitorByInputName(item.inputName)
        .then((res) => {
          if (res.meta.statusCode == 200) {
            if (res.data) {
              var timeLabel = utils.$dateObj.getTimeDistance(
                res.data.RECENTTIME
              );
              ths.recentTime = timeLabel;
              ths.recentExist = '有';
            } else {
              ths.recentTime = '当天';
              ths.recentExist = '没有';
            }
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    delProcedure() {
      var ths = this;
      api.procedureConfig
        .delProcedure({
          flowConfigId: ths.procedureCatalogTreeSelectNodeData.id,
          startStepId: ths.delProcedureItem.id,
        })
        .then((res) => {
          if (res.meta.statusCode == 200) {
            ths.isChange = true; // 做过修改
            ths.delProcedureVisible = false;
            // 选中当前流程目录
            ths.$nextTick(function () {
              ths.$refs.procedureCatalogTree.setCurrentKey(
                ths.procedureCatalogTreeSelectNodeData.id
              );
              ths.getProcedureList(ths.procedureCatalogTreeSelectNodeData);
            });
            ths.$message({
              type: 'success',
              message: '流程删除成功',
            });
          } else {
            ths.$message({
              type: 'error',
              message: res.meta.message,
            });
          }
        })
        .catch((err) => {
          ths.$message({
            type: 'error',
            message: err,
          });
        });
    },
    openCopyProcedureDialog(item) {
      this.copyProcedureVisible = true;
      this.copyProcedureData.copyProcedureName = item.title;
      this.copyProcedureData.copyInputName = item.inputName;
      this.copyProcedureItem = item;
    },
    copyProcedure() {
      var ths = this;
      ths.$refs.copyProcedureForm.validate((valid) => {
        if (valid) {
          api.procedureConfig
            .copyProcedure({
              flowConfigId: ths.procedureCatalogTreeSelectNodeData.id,
              procedureName: ths.copyProcedureData.copyProcedureName,
              inputName: ths.copyProcedureData.copyInputName,
              procedureOpen:
                ths.copyProcedureData.copyProcedureIsUse == true
                  ? 'true'
                  : 'false',
              procedureLevel: ths.copyProcedureData.copyProcedureLevel,
              procedureId: ths.copyProcedureItem.id,
            })
            .then((res) => {
              if (res.meta.statusCode == 200) {
                ths.isChange = true; // 做过修改
                ths.copyProcedureVisible = false;
                // 选中当前流程目录
                ths.$nextTick(function () {
                  ths.$refs.procedureCatalogTree.setCurrentKey(
                    ths.procedureCatalogTreeSelectNodeData.id
                  );
                  ths.getProcedureList(ths.procedureCatalogTreeSelectNodeData);
                });
              } else {
                ths.$message({
                  type: 'error',
                  message: res.meta.message,
                });
              }
            })
            .catch((err) => {
              ths.$message({
                type: 'error',
                message: err,
              });
            });
        }
      });
    },
    toProcedureMonitor(item) {
      if (item.inputName == null || item.inputName.trim() == '') {
        this.$message({
          type: 'warning',
          message: '请先输入该流程的接入名',
        });
      } else {
        for (
          var i = 0;
          i < this.$el.querySelectorAll('.li-tool-con').length;
          i++
        ) {
          this.$el.querySelectorAll('.li-tool-con')[i].style.display = 'none';
        }
        this.$router.push(
          '/procedureMonitor?flowConfigId=' +
            this.selectProcedureCatalogFlowId +
            '&procedureCode=' +
            item.inputName +
            '&procedureName=' +
            item.title +
            '&from=procedureConfig'
        );
      }
    },
    toProcedureTest(item) {
      if (item.inputName == null || item.inputName.trim() == '') {
        this.$message({
          type: 'warning',
          message: '请先输入该流程的接入名',
        });
      } else {
        for (
          var i = 0;
          i < this.$el.querySelectorAll('.li-tool-con').length;
          i++
        ) {
          this.$el.querySelectorAll('.li-tool-con')[i].style.display = 'none';
        }
        this.$router.push(
          '/procedureTest?flowConfigId=' +
            this.selectProcedureCatalogFlowId +
            '&procedureCode=' +
            item.inputName +
            '&procedureName=' +
            item.title
        );
      }
    },
    toProcedureEdit(step) {
      this.viewType = 'design';
      this.searchStepId = step.id;
      this.procedureDesignSetData();
    },
  },
  watch: {},
};
</script>
<style scoped>
.procedure-config {
  width: 100%;
  height: 100%;
  position: relative;
}
.editDialogBox {
  display: flex;
  align-items: center;
  height: 80px;
}
.editDialogBox .el-input {
  width: calc(100% - 45px);
}
.procedure-config .header {
  width: 100%;
  height: 55px;
  font-size: 12px;
  border-bottom: 1px solid #e4e4e4;
}
.procedure-config .header .search {
  height: 100%;
  float: left;
}
.procedure-config .header .search .search-div {
  float: left;
  margin-left: 20px;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
}
.procedure-config .header .search .btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #23aeff;
  cursor: pointer;
}
.procedure-config .header .search .btn div {
  color: #23aeff;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
  margin: 0 auto;
  width: 16px;
}
.procedure-config .header .tool {
  height: 100%;
  float: right;
  margin-right: 20px;
}
.procedure-config .header .tool .view-change {
  margin-left: 10px;
  cursor: pointer;
}
.procedure-config .header .tool .view-change .design-view i {
  color: #23aeff;
}
.procedure-config .header .tool .view-change .preview-view i {
  color: #23aeff;
}
.procedure-config .header .tool .btn {
  float: left;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
}
.procedure-config .header .tool .exp {
  margin-right: 10px;
}
.procedure-config .content {
  width: 100%;
  height: calc(100% - 56px);
}
.procedure-config .content .content-left-tree {
  width: 200px;
  height: 100%;
  border-right: 1px solid #e4e4e4;
  float: left;
}
.procedure-config .content .content-left-tree .tree-tool {
  width: 100%;
  height: 50px;
}
.procedure-config .content .content-left-tree .tree-tool .btn {
  float: right;
  color: #23aeff;
  cursor: pointer;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
  margin-right: 10px;
  text-align: center;
  line-height: 24px;
}
.procedure-config .content .content-left-tree .tree-content {
  width: 100%;
  height: calc(100% - 50px);
}
.procedure-config .content .content-left-tree .tree-content .custom-tree-node {
  width: 100%;
  font-size: 12px;
}
.procedure-config
  .content
  .content-left-tree
  .tree-content
  .custom-tree-node
  div {
  float: left;
}
.procedure-config
  .content
  .content-left-tree
  .tree-content
  .custom-tree-node
  .folder
  i {
  color: #f5ab00;
  font-size: 13px;
  margin-right: 5px;
}
.procedure-config
  .content
  .content-left-tree
  .tree-content
  .custom-tree-node
  .expand
  i {
  color: #23aeff;
  font-size: 13px;
}
/* .procedure-config
  .content
  .content-left-tree
  .tree-content
  .custom-tree-node
  .icon-label {
  margin-left: 10px;
} */
.procedure-config
  .content
  .content-left-tree
  .tree-content
  .custom-tree-node
  .expand-icon {
  float: right;
  margin-right: 10px;
}
.procedure-config .content .content-right-design-preview {
  width: calc(100% - 201px);
  height: 100%;
  float: left;
}
.procedure-config .content .content-right-design-preview .preview {
  width: 100%;
  height: 100%;
}
.procedure-config .content .content-right-design-preview .preview .sort-title {
  width: 100%;
  height: 50px;
  font-size: 12px;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .sort-title
  .sort-title-con {
  transform: translateY(-50%);
  position: relative;
  top: 50%;
  margin-left: 12px;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .sort-title
  .sort-title-con
  .sort-type {
  margin-left: 15px;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box {
  width: 100%;
  height: calc(100% - 50px);
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-ul {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li {
  cursor: pointer;
  width: 300px;
  height: 188px;
  background: #fbfbfb;
  border-radius: 10px;
  float: left;
  margin: 0 0 30px 24px;
  padding: 0;
  position: relative;
  border: 1px solid #fff;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li.logoff {
  background: #eee;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li.select {
  border: 1px solid #0d99e4;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li
  .li-title {
  width: 100%;
  height: 50px;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li
  .li-title
  .title-label {
  font-size: 12px;
  float: left;
  color: #333;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li.logoff
  .li-title
  .title-label {
  color: #bbb;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li
  .li-title
  .title-label
  div {
  margin: 7px 0 0 10px;
  max-width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.level-change-con {
  font-size: 12px;
  float: left;
  border-radius: 12px;
  width: 40px;
  height: 20px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  margin: 0 8px;
  cursor: pointer;
}
.level-change-con.one {
  background: #197ade;
}
.level-change-con.two {
  background: #0d99e4;
}
.level-change-con.three {
  background: #19b7de;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li
  .li-title
  .title-level {
  font-size: 12px;
  float: right;
  border-radius: 12px;
  width: 40px;
  height: 20px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  margin: 16px 10px 0 0;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li.logoff
  .li-title
  .title-level {
  background: #fff !important;
  color: #bbb !important;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li
  .li-pre-con {
  width: 280px;
  height: 116px;
  background: #fff;
  border-radius: 10px;
  margin: 10px auto;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li
  .li-tool-con {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-radius: 0 0 10px 10px;
  cursor: default;
  display: none;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li
  .li-tool-con
  .tool-ul {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .procedure-li
  .li-tool-con
  .tool-li {
  color: #fff;
  font-size: 12px;
  float: left;
  width: 50px;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
  text-align: center;
  cursor: pointer;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .add
  .content {
  width: 240px;
  height: 138px;
  border-radius: 10px;
  border: 1px dashed rgba(204, 204, 204, 1);
  margin: 0 auto;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .add
  .content
  .add-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f0f0;
  margin: 0 auto;
  line-height: 60px;
  text-align: center;
  transform: translateY(-50%);
  position: relative;
  top: 38%;
  color: #999999;
  font-weight: bold;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .procedure-box
  .add
  .content
  .add-label {
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin-top: 40px;
  color: #999999;
}
.procedure-config .content .content-right-design-preview .design {
  width: 100%;
  height: 100%;
}
.procedure-config .dialog-catalog-add .content {
  margin: 10px 0;
}
.procedure-config .dialog-catalog-add .content .box {
  width: 100%;
  height: 30px;
}
.procedure-config .dialog-catalog-add .content .label {
  color: #333333;
  float: left;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  width: 80px;
  text-align: right;
}
.procedure-config .dialog-catalog-add .content .value {
  float: left;
  font-size: 12px;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
}
.procedure-config .dialog-catalog-add .content .procedure-catalog-code {
  width: 310px;
}
.procedure-config .dialog-catalog-del .content {
  text-align: center;
  color: #333333;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.procedure-config .dialog-save .content {
  text-align: center;
  color: #333333;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.procedure-config .dialog-forbid .content {
  text-align: center;
  color: #333333;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.procedure-config .dialog-publish .content {
  text-align: center;
  color: #333333;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.procedure-config .dialog-del .content {
  text-align: center;
  color: #333333;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.procedure-config .dialog-copy .content {
  margin: 20px 0 20px 0;
  overflow: hidden;
}
.procedure-config .dialog-copy .content div {
  height: 40px;
  line-height: 40px;
  float: left;
  width: 100%;
  margin: 4px 0;
}
.procedure-config .dialog-copy .content .label {
  float: left;
  width: 120px;
  text-align: right;
}
.procedure-config .dialog-copy .content .value {
  float: left;
  width: 220px;
}
.procedure-config .dialog-backup .content .backup-type {
  margin: 20px 0;
}
.procedure-config .dialog-backup .content .backup-time-switch {
  margin-right: 10px;
}
.procedure-config .dialog-backup .content .backup-num {
  margin-left: 10px;
  margin-right: 10px;
}
.procedure-config .dialog-recover .search-title {
  margin: 20px 0;
  font-size: 12px;
}
.procedure-config .dialog-recover .search-grid {
  height: 326px;
}
.procedure-config .dialog-publish .content .desc {
  margin: 5px 0;
}
.procedure-config .dialog-publish .content .update-con-title {
  margin: 5px 0;
  font-weight: bold;
}
.procedure-config .dialog-footer {
  transform: translateX(-50%);
  position: relative;
  left: 50%;
  width: 134px;
  display: block;
  margin: 0;
}
.procedure-config .dialog-move .custom-tree-node {
  width: 100%;
  font-size: 12px;
}
.procedure-config .dialog-move .custom-tree-node div {
  float: left;
}
.procedure-config .dialog-move .custom-tree-node .folder i {
  color: #f5ab00;
  font-size: 13px;
  margin-right: 5px;
}
.procedure-config .dialog-move .custom-tree-node .expand i {
  color: #23aeff;
  font-size: 13px;
}
.procedure-config .dialog-move .custom-tree-node .expand-icon {
  float: right;
  margin-right: 10px;
}
</style>
<style>
.procedure-config .header .search .status .el-input {
  width: 110px;
}
.procedure-config .header .search .level .el-input {
  width: 110px;
}
.procedure-config .header .search .level .el-input {
  width: 110px;
}
/* .procedure-config .content .content-left-tree .el-tree-node__expand-icon {
  display: none;
} */
.procedure-config .content .content-left-tree .el-tree-node__content {
  border-left: 3px solid #fff;
  height: 33px;
}
.procedure-config
  .content
  .content-left-tree
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  border-left: 3px solid #23aeff;
}
.procedure-config
  .content
  .content-right-design-preview
  .preview
  .sort-title
  .el-input {
  width: 110px;
}
.procedure-config .dialog-catalog-del .el-dialog__header {
  border: none;
}
.procedure-config .dialog-save .el-dialog__header {
  border: none;
}
.procedure-config .dialog-forbid .el-dialog__header {
  border: none;
}
.procedure-config .dialog-publish .el-dialog__header {
  border: none;
}
.procedure-config .dialog-del .el-dialog__header {
  border: none;
}
.procedure-config .backup-date-type .el-input {
  width: 110px;
}
.procedure-config .el-input-number--mini {
  width: 110px;
}
.procedure-config .search-backup-type .el-input {
  width: 110px;
}
.procedure-config .dialog-recover .search-backup-time {
  width: 340px;
}
.procedure-config .dialog-recover .el-dialog {
  margin-top: 30px !important;
}
.procedure-config .dialog-copy .el-radio__input {
  display: none;
}
.procedure-config .dialog-copy .el-form-item__error {
  width: 100px;
  padding-top: 0px;
}
.procedure-config .dialog-copy .el-radio__label {
  padding-left: 0px;
  display: block;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 0 10px;
}
.procedure-config
  .dialog-copy
  .procedure-level-con
  .el-radio__input.is-checked
  + .el-radio__label {
  color: #fff;
}
.procedure-config
  .dialog-copy
  .procedure-level-con
  label:nth-child(1)
  .el-radio__input.is-checked
  + .el-radio__label {
  background: #197ade;
  border: 1px solid #197ade;
}
.procedure-config
  .dialog-copy
  .procedure-level-con
  label:nth-child(2)
  .el-radio__input.is-checked
  + .el-radio__label {
  background: #0d99e4;
  border: 1px solid #0d99e4;
}
.procedure-config
  .dialog-copy
  .procedure-level-con
  label:nth-child(3)
  .el-radio__input.is-checked
  + .el-radio__label {
  background: #19b7de;
  border: 1px solid #19b7de;
}
.procedure-config .dialog-copy .el-radio {
  transform: translateY(-50%);
  position: relative;
  top: 50%;
  float: left;
}
/* 动态修改 element ui 展开的图标 */
.procedure-config .dialog-recover .el-table__expand-icon > .el-icon {
  color: #23aeff !important;
  font-size: 15px !important;
}
.procedure-config .dialog-publish .el-table__expand-icon > .el-icon {
  color: #23aeff !important;
  font-size: 15px !important;
}
</style>
