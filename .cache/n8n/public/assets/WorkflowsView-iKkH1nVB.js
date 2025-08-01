import { P as ProjectCardBadge, _ as _sfc_main$4 } from "./ProjectCardBadge-be4FNX6y.js";
import { d as defineComponent, R as useRoute, b as useRouter, a2 as useFoldersStore, r as ref, q as computed, c as useI18n, ab as ProjectTypes, V as VIEWS, h as resolveComponent, i as createElementBlock, g as openBlock, j as createVNode, w as withCtx, n as normalizeClass, k as createBaseVNode, f as createCommentVNode, e as createBlock, m as unref, g5 as ResourceType, b3 as withModifiers, l as createTextVNode, t as toDisplayString, ef as _sfc_main$3, _ as _export_sfc, a as useToast, p as useSettingsStore, H as useUIStore, u as useUsersStore, Q as useWorkflowsStore, a1 as useProjectsStore, a7 as getResourcePermissions, fZ as dateFormat, aA as withDirectives, aB as vShow, af as WORKFLOW_SHARE_MODAL_KEY, ag as useTelemetry, an as DUPLICATE_MODAL_KEY, ai as useMessage, aj as MODAL_CONFIRM, g6 as PROJECT_MOVE_RESOURCE_MODAL, g7 as FOLDER_NAME_ILLEGAL_CHARACTERS_REGEX, g8 as ILLEGAL_FOLDER_CHARACTERS, g9 as FOLDER_NAME_ONLY_DOTS_REGEX, ga as FOLDER_NAME_MAX_LENGTH, a0 as useSourceControlStore, au as usePostHog, E as useTagsStore, ez as useUsageStore, gb as useInsightsStore, a4 as useDocumentTitle, G as useDebounce, aa as EnterpriseEditionFeature, gc as EASY_AI_WORKFLOW_EXPERIMENT, X as watch, o as onMounted, C as createEventBus, y as onBeforeUnmount, A as debounce, gd as PROJECT_ROOT, aV as createSlots, ew as N8nInputLabel, ad as _sfc_main$5, fp as N8nSelect, F as Fragment, D as renderList, fo as _sfc_main$6, ek as N8nHeading, bf as N8nText, ge as N8nCard, bJ as N8nIcon, gf as Draggable, gg as DEFAULT_WORKFLOW_PAGE_SIZE, eC as COMMUNITY_PLUS_ENROLLMENT_MODAL } from "./index-HDYArLT1.js";
import { W as WorkflowActivator, _ as __unplugin_components_0, I as InlineTextEdit } from "./WorkflowActivator-C30ojCUO.js";
import { R as ResourcesListLayout } from "./ResourcesListLayout-DLThke_K.js";
import { P as ProjectHeader } from "./ProjectHeader-CsHp0dpi.js";
import { u as useProjectPages } from "./useProjectPages-DGU7KQ6y.js";
import { I as InsightsSummary } from "./InsightsSummary-CTzqNpAf.js";
import { g as getEasyAiWorkflowJson } from "./easyAiWorkflowUtils-H7-jyGZy.js";
import "./useWorkflowActivate-CUShgia-.js";
const FOLDER_LIST_ITEM_ACTIONS = {
  OPEN: "open",
  CREATE: "create",
  CREATE_WORKFLOW: "create_workflow",
  RENAME: "rename",
  MOVE: "move",
  DELETE: "delete"
};
const _hoisted_1$2 = { "data-test-id": "folder-card" };
const _hoisted_2$1 = { key: 0 };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FolderCard",
  props: {
    data: {},
    personalProject: {},
    actions: { default: () => [] },
    readOnly: { type: Boolean, default: true },
    showOwnershipBadge: { type: Boolean, default: false }
  },
  emits: ["action", "folderOpened"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const i18n = useI18n();
    const route = useRoute();
    const router = useRouter();
    const foldersStore = useFoldersStore();
    const emit = __emit;
    const hiddenBreadcrumbsItemsAsync = ref(new Promise(() => {
    }));
    const cachedHiddenBreadcrumbsItems = ref([]);
    const resourceTypeLabel = computed(() => i18n.baseText("generic.folder").toLowerCase());
    const cardUrl = computed(() => {
      return getFolderUrl(props.data.id);
    });
    const projectName = computed(() => {
      if (props.data.homeProject?.type === ProjectTypes.Personal) {
        return i18n.baseText("projects.menu.personal");
      }
      return props.data.homeProject?.name;
    });
    const cardBreadcrumbs = computed(() => {
      if (props.data.parentFolder) {
        return [
          {
            id: props.data.parentFolder.id,
            name: props.data.parentFolder.name,
            label: props.data.parentFolder.name,
            href: router.resolve({
              name: VIEWS.PROJECTS_FOLDERS,
              params: {
                projectId: props.data.homeProject?.id,
                folderId: props.data.parentFolder.id
              }
            }).href
          }
        ];
      }
      return [];
    });
    const showCardBreadcrumbs = computed(() => {
      return props.showOwnershipBadge && cardBreadcrumbs.value.length;
    });
    const getFolderUrl = (folderId) => {
      return router.resolve({
        name: VIEWS.PROJECTS_FOLDERS,
        params: {
          projectId: route.params.projectId,
          folderId
        },
        query: route.query
      }).href;
    };
    const onAction = async (action) => {
      if (action === FOLDER_LIST_ITEM_ACTIONS.OPEN) {
        emit("folderOpened", { folder: props.data });
        await router.push(cardUrl.value);
        return;
      }
      emit("action", { action, folderId: props.data.id });
    };
    const fetchHiddenBreadCrumbsItems = async () => {
      if (!props.data.homeProject?.id || !projectName.value || !props.data.parentFolder) {
        hiddenBreadcrumbsItemsAsync.value = Promise.resolve([]);
      } else {
        if (cachedHiddenBreadcrumbsItems.value.length) {
          hiddenBreadcrumbsItemsAsync.value = Promise.resolve(cachedHiddenBreadcrumbsItems.value);
          return;
        }
        const loadedItem = foldersStore.getHiddenBreadcrumbsItems(
          { id: props.data.homeProject.id, name: projectName.value },
          props.data.parentFolder.id
        );
        hiddenBreadcrumbsItemsAsync.value = loadedItem;
        cachedHiddenBreadcrumbsItems.value = await loadedItem;
      }
    };
    const onBreadcrumbItemClick = async (item) => {
      if (item.href) {
        await router.push(item.href);
      }
    };
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_N8nBadge = resolveComponent("N8nBadge");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_TimeAgo = _sfc_main$3;
      const _component_n8n_breadcrumbs = resolveComponent("n8n-breadcrumbs");
      const _component_ProjectCardBadge = ProjectCardBadge;
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      const _component_n8n_card = resolveComponent("n8n-card");
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(_component_router_link, {
          to: cardUrl.value,
          onClick: _cache[1] || (_cache[1] = () => emit("folderOpened", { folder: props.data }))
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_card, {
              class: normalizeClass(_ctx.$style.card)
            }, {
              prepend: withCtx(() => [
                createVNode(_component_n8n_icon, {
                  "data-test-id": "folder-card-icon",
                  class: normalizeClass(_ctx.$style["folder-icon"]),
                  icon: "folder",
                  size: "xlarge"
                }, null, 8, ["class"])
              ]),
              header: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style["card-header"])
                }, [
                  createVNode(_component_n8n_heading, {
                    tag: "h2",
                    bold: "",
                    size: "small",
                    "data-test-id": "folder-card-name"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.data.name), 1)
                    ]),
                    _: 1
                  }),
                  _ctx.readOnly ? (openBlock(), createBlock(_component_N8nBadge, {
                    key: 0,
                    class: "ml-3xs",
                    theme: "tertiary",
                    bold: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workflows.item.readonly")), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ], 2)
              ]),
              footer: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style["card-footer"])
                }, [
                  _ctx.data.workflowCount > 0 ? (openBlock(), createBlock(_component_n8n_text, {
                    key: 0,
                    size: "small",
                    color: "text-light",
                    class: normalizeClass([_ctx.$style["info-cell"], _ctx.$style["info-cell--workflow-count"]]),
                    "data-test-id": "folder-card-folder-count"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("generic.workflow", { interpolate: { count: _ctx.data.workflowCount } })), 1)
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("", true),
                  _ctx.data.subFolderCount > 0 ? (openBlock(), createBlock(_component_n8n_text, {
                    key: 1,
                    size: "small",
                    color: "text-light",
                    class: normalizeClass([_ctx.$style["info-cell"], _ctx.$style["info-cell--workflow-count"]]),
                    "data-test-id": "folder-card-workflow-count"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("generic.folderCount", {
                        interpolate: { count: _ctx.data.subFolderCount }
                      })), 1)
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("", true),
                  createVNode(_component_n8n_text, {
                    size: "small",
                    color: "text-light",
                    class: normalizeClass([_ctx.$style["info-cell"], _ctx.$style["info-cell--updated"]]),
                    "data-test-id": "folder-card-last-updated"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workerList.item.lastUpdated")) + " ", 1),
                      createVNode(_component_TimeAgo, {
                        date: String(_ctx.data.updatedAt)
                      }, null, 8, ["date"])
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  createVNode(_component_n8n_text, {
                    size: "small",
                    color: "text-light",
                    class: normalizeClass([_ctx.$style["info-cell"], _ctx.$style["info-cell--created"]]),
                    "data-test-id": "folder-card-created"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workflows.item.created")) + " ", 1),
                      createVNode(_component_TimeAgo, {
                        date: String(_ctx.data.createdAt)
                      }, null, 8, ["date"])
                    ]),
                    _: 1
                  }, 8, ["class"])
                ], 2)
              ]),
              append: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style["card-actions"]),
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["prevent"]))
                }, [
                  _ctx.data.homeProject && _ctx.showOwnershipBadge ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
                    createVNode(_component_ProjectCardBadge, {
                      class: normalizeClass({
                        [_ctx.$style.cardBadge]: true,
                        [_ctx.$style["with-breadcrumbs"]]: showCardBreadcrumbs.value
                      }),
                      resource: _ctx.data,
                      "resource-type": unref(ResourceType).Workflow,
                      "resource-type-label": resourceTypeLabel.value,
                      "personal-project": _ctx.personalProject,
                      "show-badge-border": false
                    }, {
                      default: withCtx(() => [
                        showCardBreadcrumbs.value ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(_ctx.$style.breadcrumbs)
                        }, [
                          createVNode(_component_n8n_breadcrumbs, {
                            items: cardBreadcrumbs.value,
                            "hidden-items": _ctx.data.parentFolder?.parentFolderId !== null ? hiddenBreadcrumbsItemsAsync.value : void 0,
                            "path-truncated": _ctx.data.parentFolder?.parentFolderId !== null,
                            "highlight-last-item": false,
                            "hidden-items-trigger": "hover",
                            theme: "small",
                            "data-test-id": "folder-card-breadcrumbs",
                            onTooltipOpened: fetchHiddenBreadCrumbsItems,
                            onItemSelected: onBreadcrumbItemClick
                          }, {
                            prepend: withCtx(() => _cache[2] || (_cache[2] = [])),
                            _: 1
                          }, 8, ["items", "hidden-items", "path-truncated"])
                        ], 2)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["class", "resource", "resource-type", "resource-type-label", "personal-project"])
                  ])) : createCommentVNode("", true),
                  _ctx.actions.length ? (openBlock(), createBlock(_component_n8n_action_toggle, {
                    key: 1,
                    actions: _ctx.actions,
                    theme: "dark",
                    "data-test-id": "folder-card-actions",
                    onAction
                  }, null, 8, ["actions"])) : createCommentVNode("", true)
                ], 2)
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        }, 8, ["to"])
      ]);
    };
  }
});
const card = "_card_pt4ir_123";
const cardBadge$1 = "_cardBadge_pt4ir_157";
const style0$2 = {
  card,
  "folder-icon": "_folder-icon_pt4ir_131",
  "card-header": "_card-header_pt4ir_140",
  "card-footer": "_card-footer_pt4ir_148",
  "info-cell": "_info-cell_pt4ir_152",
  cardBadge: cardBadge$1,
  "with-breadcrumbs": "_with-breadcrumbs_pt4ir_157",
  "card-actions": "_card-actions_pt4ir_164",
  "info-cell--created": "_info-cell--created_pt4ir_182"
};
const cssModules$2 = {
  "$style": style0$2
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _hoisted_1$1 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowCard",
  props: {
    data: {},
    readOnly: { type: Boolean, default: false },
    workflowListEventBus: { default: void 0 },
    showOwnershipBadge: { type: Boolean, default: false }
  },
  emits: ["expand:tags", "click:tag", "workflow:deleted", "workflow:archived", "workflow:unarchived", "workflow:active-toggle", "action:move-to-folder"],
  setup(__props, { emit: __emit }) {
    const WORKFLOW_LIST_ITEM_ACTIONS = {
      OPEN: "open",
      SHARE: "share",
      DUPLICATE: "duplicate",
      DELETE: "delete",
      ARCHIVE: "archive",
      UNARCHIVE: "unarchive",
      MOVE: "move",
      MOVE_TO_FOLDER: "moveToFolder"
    };
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const message = useMessage();
    const locale = useI18n();
    const router = useRouter();
    const route = useRoute();
    const telemetry = useTelemetry();
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    const usersStore = useUsersStore();
    const workflowsStore = useWorkflowsStore();
    const projectsStore = useProjectsStore();
    const foldersStore = useFoldersStore();
    const hiddenBreadcrumbsItemsAsync = ref(new Promise(() => {
    }));
    const cachedHiddenBreadcrumbsItems = ref([]);
    const resourceTypeLabel = computed(() => locale.baseText("generic.workflow").toLowerCase());
    const currentUser = computed(() => usersStore.currentUser ?? {});
    const workflowPermissions = computed(() => getResourcePermissions(props.data.scopes).workflow);
    const showFolders = computed(() => {
      return settingsStore.isFoldersFeatureEnabled && route.name !== VIEWS.WORKFLOWS;
    });
    const showCardBreadcrumbs = computed(() => {
      return props.showOwnershipBadge && !isSomeoneElsesWorkflow.value && cardBreadcrumbs.value.length;
    });
    const projectName = computed(() => {
      if (props.data.homeProject?.type === ProjectTypes.Personal) {
        return locale.baseText("projects.menu.personal");
      }
      return props.data.homeProject?.name;
    });
    const cardBreadcrumbs = computed(() => {
      if (props.data.parentFolder) {
        return [
          {
            id: props.data.parentFolder.id,
            name: props.data.parentFolder.name,
            label: props.data.parentFolder.name,
            href: router.resolve({
              name: VIEWS.PROJECTS_FOLDERS,
              params: {
                projectId: props.data.homeProject?.id,
                folderId: props.data.parentFolder.id
              }
            }).href
          }
        ];
      }
      return [];
    });
    const actions = computed(() => {
      const items = [
        {
          label: locale.baseText("workflows.item.open"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.OPEN
        },
        {
          label: locale.baseText("workflows.item.share"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.SHARE
        }
      ];
      if (workflowPermissions.value.create && !props.readOnly && !props.data.isArchived) {
        items.push({
          label: locale.baseText("workflows.item.duplicate"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.DUPLICATE
        });
      }
      if ((workflowPermissions.value.update && !props.readOnly || workflowPermissions.value.move && projectsStore.isTeamProjectFeatureEnabled) && showFolders.value && route.name !== VIEWS.SHARED_WORKFLOWS) {
        items.push({
          label: locale.baseText("folders.actions.moveToFolder"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.MOVE_TO_FOLDER
        });
      }
      if (workflowPermissions.value.delete && !props.readOnly) {
        if (!props.data.isArchived) {
          items.push({
            label: locale.baseText("workflows.item.archive"),
            value: WORKFLOW_LIST_ITEM_ACTIONS.ARCHIVE
          });
        } else {
          items.push({
            label: locale.baseText("workflows.item.delete"),
            value: WORKFLOW_LIST_ITEM_ACTIONS.DELETE
          });
          items.push({
            label: locale.baseText("workflows.item.unarchive"),
            value: WORKFLOW_LIST_ITEM_ACTIONS.UNARCHIVE
          });
        }
      }
      return items;
    });
    const formattedCreatedAtDate = computed(() => {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
      return dateFormat(
        props.data.createdAt,
        `d mmmm${String(props.data.createdAt).startsWith(currentYear) ? "" : ", yyyy"}`
      );
    });
    const isSomeoneElsesWorkflow = computed(
      () => props.data.homeProject?.type !== ProjectTypes.Team && props.data.homeProject?.id !== projectsStore.personalProject?.id
    );
    async function onClick(event) {
      if (event?.ctrlKey || event?.metaKey) {
        const route2 = router.resolve({
          name: VIEWS.WORKFLOW,
          params: { name: props.data.id }
        });
        window.open(route2.href, "_blank");
        return;
      }
      await router.push({
        name: VIEWS.WORKFLOW,
        params: { name: props.data.id }
      });
    }
    function onClickTag(tagId, event) {
      event.stopPropagation();
      emit("click:tag", tagId, event);
    }
    function onExpandTags() {
      emit("expand:tags");
    }
    async function onAction(action) {
      switch (action) {
        case WORKFLOW_LIST_ITEM_ACTIONS.OPEN:
          await onClick();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.DUPLICATE:
          uiStore.openModalWithData({
            name: DUPLICATE_MODAL_KEY,
            data: {
              id: props.data.id,
              name: props.data.name,
              tags: (props.data.tags ?? []).map(
                (tag) => typeof tag !== "string" && "id" in tag ? tag.id : tag
              ),
              externalEventBus: props.workflowListEventBus,
              parentFolderId: props.data.parentFolder?.id
            }
          });
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.SHARE:
          uiStore.openModalWithData({
            name: WORKFLOW_SHARE_MODAL_KEY,
            data: { id: props.data.id }
          });
          telemetry.track("User opened sharing modal", {
            workflow_id: props.data.id,
            user_id_sharer: currentUser.value.id,
            sub_view: "Workflows listing"
          });
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.DELETE:
          await deleteWorkflow();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.ARCHIVE:
          await archiveWorkflow();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.UNARCHIVE:
          await unarchiveWorkflow();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.MOVE:
          moveResource();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.MOVE_TO_FOLDER:
          emit("action:move-to-folder", {
            id: props.data.id,
            name: props.data.name,
            parentFolderId: props.data.parentFolder?.id,
            sharedWithProjects: props.data.sharedWithProjects
          });
          break;
      }
    }
    async function deleteWorkflow() {
      const deleteConfirmed = await message.confirm(
        locale.baseText("mainSidebar.confirmMessage.workflowDelete.message", {
          interpolate: { workflowName: props.data.name }
        }),
        locale.baseText("mainSidebar.confirmMessage.workflowDelete.headline"),
        {
          type: "warning",
          confirmButtonText: locale.baseText(
            "mainSidebar.confirmMessage.workflowDelete.confirmButtonText"
          ),
          cancelButtonText: locale.baseText(
            "mainSidebar.confirmMessage.workflowDelete.cancelButtonText"
          )
        }
      );
      if (deleteConfirmed !== MODAL_CONFIRM) {
        return;
      }
      try {
        await workflowsStore.deleteWorkflow(props.data.id);
      } catch (error) {
        toast.showError(error, locale.baseText("generic.deleteWorkflowError"));
        return;
      }
      toast.showMessage({
        title: locale.baseText("mainSidebar.showMessage.handleSelect1.title", {
          interpolate: { workflowName: props.data.name }
        }),
        type: "success"
      });
      emit("workflow:deleted");
    }
    async function archiveWorkflow() {
      if (props.data.active) {
        const archiveConfirmed = await message.confirm(
          locale.baseText("mainSidebar.confirmMessage.workflowArchive.message", {
            interpolate: { workflowName: props.data.name }
          }),
          locale.baseText("mainSidebar.confirmMessage.workflowArchive.headline"),
          {
            type: "warning",
            confirmButtonText: locale.baseText(
              "mainSidebar.confirmMessage.workflowArchive.confirmButtonText"
            ),
            cancelButtonText: locale.baseText(
              "mainSidebar.confirmMessage.workflowArchive.cancelButtonText"
            )
          }
        );
        if (archiveConfirmed !== MODAL_CONFIRM) {
          return;
        }
      }
      try {
        await workflowsStore.archiveWorkflow(props.data.id);
      } catch (error) {
        toast.showError(error, locale.baseText("generic.archiveWorkflowError"));
        return;
      }
      toast.showMessage({
        title: locale.baseText("mainSidebar.showMessage.handleArchive.title", {
          interpolate: { workflowName: props.data.name }
        }),
        type: "success"
      });
      emit("workflow:archived");
    }
    async function unarchiveWorkflow() {
      try {
        await workflowsStore.unarchiveWorkflow(props.data.id);
      } catch (error) {
        toast.showError(error, locale.baseText("generic.unarchiveWorkflowError"));
        return;
      }
      toast.showMessage({
        title: locale.baseText("mainSidebar.showMessage.handleUnarchive.title", {
          interpolate: { workflowName: props.data.name }
        }),
        type: "success"
      });
      emit("workflow:unarchived");
    }
    const fetchHiddenBreadCrumbsItems = async () => {
      if (!props.data.homeProject?.id || !projectName.value || !props.data.parentFolder) {
        hiddenBreadcrumbsItemsAsync.value = Promise.resolve([]);
      } else {
        if (cachedHiddenBreadcrumbsItems.value.length) {
          hiddenBreadcrumbsItemsAsync.value = Promise.resolve(cachedHiddenBreadcrumbsItems.value);
          return;
        }
        const loadedItem = foldersStore.getHiddenBreadcrumbsItems(
          { id: props.data.homeProject.id, name: projectName.value },
          props.data.parentFolder.id
        );
        hiddenBreadcrumbsItemsAsync.value = loadedItem;
        cachedHiddenBreadcrumbsItems.value = await loadedItem;
      }
    };
    function moveResource() {
      uiStore.openModalWithData({
        name: PROJECT_MOVE_RESOURCE_MODAL,
        data: {
          resource: props.data,
          resourceType: ResourceType.Workflow,
          resourceTypeLabel: resourceTypeLabel.value,
          eventBus: props.workflowListEventBus
        }
      });
    }
    const emitWorkflowActiveToggle = (value) => {
      emit("workflow:active-toggle", value);
    };
    const onBreadcrumbItemClick = async (item) => {
      if (item.href) {
        await router.push(item.href);
      }
    };
    return (_ctx, _cache) => {
      const _component_N8nBadge = resolveComponent("N8nBadge");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_tags = resolveComponent("n8n-tags");
      const _component_n8n_breadcrumbs = resolveComponent("n8n-breadcrumbs");
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      const _component_n8n_card = resolveComponent("n8n-card");
      return openBlock(), createBlock(_component_n8n_card, {
        class: normalizeClass({
          [_ctx.$style.cardLink]: true,
          [_ctx.$style.cardArchived]: _ctx.data.isArchived
        }),
        "data-test-id": "workflow-card",
        onClick
      }, {
        header: withCtx(() => [
          createVNode(_component_n8n_text, {
            tag: "h2",
            bold: "",
            class: normalizeClass({
              [_ctx.$style.cardHeading]: true,
              [_ctx.$style.cardHeadingArchived]: _ctx.data.isArchived
            }),
            "data-test-id": "workflow-card-name"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.data.name) + " ", 1),
              !workflowPermissions.value.update ? (openBlock(), createBlock(_component_N8nBadge, {
                key: 0,
                class: "ml-3xs",
                theme: "tertiary",
                bold: ""
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("workflows.item.readonly")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        append: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardActions),
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }, [
            _ctx.showOwnershipBadge ? (openBlock(), createBlock(ProjectCardBadge, {
              key: 0,
              class: normalizeClass({ [_ctx.$style.cardBadge]: true, [_ctx.$style["with-breadcrumbs"]]: showCardBreadcrumbs.value }),
              resource: _ctx.data,
              "resource-type": unref(ResourceType).Workflow,
              "resource-type-label": resourceTypeLabel.value,
              "personal-project": unref(projectsStore).personalProject,
              "show-badge-border": false
            }, {
              default: withCtx(() => [
                showCardBreadcrumbs.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(_ctx.$style.breadcrumbs)
                }, [
                  createVNode(_component_n8n_breadcrumbs, {
                    items: cardBreadcrumbs.value,
                    "hidden-items": _ctx.data.parentFolder?.parentFolderId !== null ? hiddenBreadcrumbsItemsAsync.value : void 0,
                    "path-truncated": _ctx.data.parentFolder?.parentFolderId !== null,
                    "highlight-last-item": false,
                    "hidden-items-trigger": "hover",
                    theme: "small",
                    "data-test-id": "workflow-card-breadcrumbs",
                    onTooltipOpened: fetchHiddenBreadCrumbsItems,
                    onItemSelected: onBreadcrumbItemClick
                  }, {
                    prepend: withCtx(() => _cache[2] || (_cache[2] = [])),
                    _: 1
                  }, 8, ["items", "hidden-items", "path-truncated"])
                ], 2)) : createCommentVNode("", true)
              ]),
              _: 1
            }, 8, ["class", "resource", "resource-type", "resource-type-label", "personal-project"])) : createCommentVNode("", true),
            _ctx.data.isArchived ? (openBlock(), createBlock(_component_n8n_text, {
              key: 1,
              color: "text-light",
              size: "small",
              bold: "",
              class: "ml-s mr-s",
              "data-test-id": "workflow-card-archived"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(locale).baseText("workflows.item.archived")), 1)
              ]),
              _: 1
            })) : (openBlock(), createBlock(WorkflowActivator, {
              key: 2,
              class: "mr-s",
              "is-archived": _ctx.data.isArchived,
              "workflow-active": _ctx.data.active,
              "workflow-id": _ctx.data.id,
              "workflow-permissions": workflowPermissions.value,
              "data-test-id": "workflow-card-activator",
              "onUpdate:workflowActive": emitWorkflowActiveToggle
            }, null, 8, ["is-archived", "workflow-active", "workflow-id", "workflow-permissions"])),
            createVNode(_component_n8n_action_toggle, {
              actions: actions.value,
              theme: "dark",
              "data-test-id": "workflow-card-actions",
              onAction
            }, null, 8, ["actions"])
          ], 2)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardDescription)
          }, [
            createVNode(_component_n8n_text, {
              color: "text-light",
              size: "small"
            }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("span", null, [
                  createTextVNode(toDisplayString(unref(locale).baseText("workflows.item.updated")) + " ", 1),
                  createVNode(_sfc_main$3, {
                    date: String(_ctx.data.updatedAt)
                  }, null, 8, ["date"]),
                  _cache[1] || (_cache[1] = createTextVNode(" | "))
                ], 512), [
                  [vShow, _ctx.data]
                ]),
                withDirectives(createBaseVNode("span", { class: "mr-2xs" }, toDisplayString(unref(locale).baseText("workflows.item.created")) + " " + toDisplayString(formattedCreatedAtDate.value), 513), [
                  [vShow, _ctx.data]
                ]),
                unref(settingsStore).areTagsEnabled && _ctx.data.tags && _ctx.data.tags.length > 0 ? withDirectives((openBlock(), createElementBlock("span", _hoisted_1$1, [
                  createVNode(_component_n8n_tags, {
                    tags: _ctx.data.tags,
                    "truncate-at": 3,
                    truncate: "",
                    "data-test-id": "workflow-card-tags",
                    "onClick:tag": onClickTag,
                    onExpand: onExpandTags
                  }, null, 8, ["tags"])
                ], 512)), [
                  [vShow, _ctx.data]
                ]) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ], 2)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const cardLink = "_cardLink_15m1t_123";
const cardHeading = "_cardHeading_15m1t_133";
const cardHeadingArchived = "_cardHeadingArchived_15m1t_142";
const cardDescription = "_cardDescription_15m1t_146";
const cardActions = "_cardActions_15m1t_153";
const cardBadge = "_cardBadge_15m1t_163";
const cardArchived = "_cardArchived_15m1t_174";
const breadcrumbs = "_breadcrumbs_15m1t_191";
const style0$1 = {
  cardLink,
  cardHeading,
  cardHeadingArchived,
  cardDescription,
  cardActions,
  cardBadge,
  "with-breadcrumbs": "_with-breadcrumbs_15m1t_167",
  cardArchived,
  breadcrumbs
};
const cssModules$1 = {
  "$style": style0$1
};
const WorkflowCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
function isDropTarget(target) {
  return target.type === "folder" || target.type === "project";
}
function isValidResourceType(value) {
  return ["folder", "workflow", "project"].includes(value);
}
function useFolders() {
  const i18n = useI18n();
  const foldersStore = useFoldersStore();
  const isDragging = computed(() => {
    return foldersStore.draggedElement !== null;
  });
  function validateFolderName(folderName) {
    if (FOLDER_NAME_ILLEGAL_CHARACTERS_REGEX.test(folderName)) {
      return i18n.baseText("folders.invalidName.invalidCharacters.message", {
        interpolate: {
          illegalChars: ILLEGAL_FOLDER_CHARACTERS.join(" ")
        }
      });
    }
    if (FOLDER_NAME_ONLY_DOTS_REGEX.test(folderName)) {
      return i18n.baseText("folders.invalidName.only.dots.message");
    }
    if (folderName.startsWith(".")) {
      return i18n.baseText("folders.invalidName.starts.with.dot..message");
    }
    if (folderName.trim() === "") {
      return i18n.baseText("folders.invalidName.empty.message");
    }
    if (folderName.length > FOLDER_NAME_MAX_LENGTH) {
      return i18n.baseText("folders.invalidName.tooLong.message", {
        interpolate: {
          maxLength: FOLDER_NAME_MAX_LENGTH
        }
      });
    }
    return true;
  }
  function onDragStart(el) {
    const eventTarget = el.closest("[data-target]");
    if (!eventTarget) return;
    const dragTarget = getDragAndDropTarget(eventTarget);
    if (!dragTarget) return;
    if (dragTarget.type === "folder" || dragTarget.type === "workflow") {
      foldersStore.draggedElement = {
        type: dragTarget.type,
        id: dragTarget.id,
        name: dragTarget.name
      };
    }
  }
  function onDragEnd() {
    foldersStore.draggedElement = null;
    foldersStore.activeDropTarget = null;
  }
  function onDragEnter(event) {
    const eventTarget = event.target;
    if (!eventTarget || !isDragging.value) return;
    event.preventDefault();
    event.stopPropagation();
    const dragTarget = getDragAndDropTarget(eventTarget);
    if (!dragTarget || dragTarget.type !== "folder") return;
    foldersStore.activeDropTarget = {
      type: dragTarget.type,
      id: dragTarget.id,
      name: dragTarget.name
    };
  }
  function resetDropTarget() {
    foldersStore.activeDropTarget = null;
  }
  function getDragAndDropTarget(el) {
    const dragTarget = el.closest("[data-target]");
    if (!dragTarget) return null;
    const targetResource = dragTarget.dataset.target;
    const targetId = dragTarget.dataset.resourceid;
    const targetName = dragTarget.dataset.resourcename;
    if (!targetResource || !targetId || !targetName || !isValidResourceType(targetResource))
      return null;
    return {
      type: targetResource,
      id: targetId,
      name: targetName
    };
  }
  function handleDrop(event) {
    const eventTarget = event.target;
    if (!eventTarget || !isDragging.value) return {};
    event.preventDefault();
    const draggedResourceId = foldersStore.draggedElement?.id;
    const draggedResourceType = foldersStore.draggedElement?.type;
    const draggedResourceName = foldersStore.draggedElement?.name;
    if (!draggedResourceId || !draggedResourceType || !draggedResourceName) return {};
    onDragEnd();
    const dropTarget = getDragAndDropTarget(eventTarget);
    if (!dropTarget || !isDropTarget(dropTarget)) return {};
    return {
      draggedResource: {
        type: draggedResourceType,
        id: draggedResourceId,
        name: draggedResourceName
      },
      dropTarget: {
        type: dropTarget.type,
        id: dropTarget.id,
        name: dropTarget.name
      }
    };
  }
  return {
    validateFolderName,
    onDragStart,
    onDragEnd,
    onDragEnter,
    resetDropTarget,
    handleDrop
  };
}
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { key: 1 };
const _hoisted_6 = {
  class: "text-center mt-s",
  "data-test-id": "list-empty-state"
};
const _hoisted_7 = {
  key: 0,
  class: "mb-s"
};
const _hoisted_8 = { class: "mb-s" };
const _hoisted_9 = { class: "mb-s" };
const SEARCH_DEBOUNCE_TIME = 300;
const FILTERS_DEBOUNCE_TIME = 100;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowsView",
  setup(__props) {
    const StatusFilter = {
      ALL: "",
      ACTIVE: "active",
      DEACTIVATED: "deactivated"
    };
    const WORKFLOWS_SORT_MAP = {
      lastUpdated: "updatedAt:desc",
      lastCreated: "createdAt:desc",
      nameAsc: "name:asc",
      nameDesc: "name:desc"
    };
    const i18n = useI18n();
    const route = useRoute();
    const router = useRouter();
    const message = useMessage();
    const toast = useToast();
    const folderHelpers = useFolders();
    const sourceControlStore = useSourceControlStore();
    const usersStore = useUsersStore();
    const workflowsStore = useWorkflowsStore();
    const settingsStore = useSettingsStore();
    const posthogStore = usePostHog();
    const projectsStore = useProjectsStore();
    const telemetry = useTelemetry();
    const uiStore = useUIStore();
    const tagsStore = useTagsStore();
    const foldersStore = useFoldersStore();
    const usageStore = useUsageStore();
    const insightsStore = useInsightsStore();
    const documentTitle = useDocumentTitle();
    const { callDebounced } = useDebounce();
    const projectPages = useProjectPages();
    const loading = ref(true);
    const breadcrumbsLoading = ref(false);
    const filters = ref({
      search: "",
      homeProject: "",
      status: StatusFilter.ALL,
      showArchived: false,
      tags: []
    });
    const workflowListEventBus = createEventBus();
    const workflowsAndFolders = ref([]);
    const easyAICalloutVisible = ref(true);
    const currentPage = ref(1);
    const pageSize = ref(DEFAULT_WORKFLOW_PAGE_SIZE);
    const currentSort = ref("updatedAt:desc");
    const currentFolderId = ref(null);
    const showCardsBadge = ref(false);
    const isNameEditEnabled = ref(false);
    const folderActions = computed(() => [
      {
        label: i18n.baseText("generic.open"),
        value: FOLDER_LIST_ITEM_ACTIONS.OPEN,
        disabled: false,
        onlyAvailableOn: "card"
      },
      {
        label: i18n.baseText("folders.actions.create"),
        value: FOLDER_LIST_ITEM_ACTIONS.CREATE,
        disabled: readOnlyEnv.value || !hasPermissionToCreateFolders.value
      },
      {
        label: i18n.baseText("folders.actions.create.workflow"),
        value: FOLDER_LIST_ITEM_ACTIONS.CREATE_WORKFLOW,
        disabled: readOnlyEnv.value || !hasPermissionToCreateWorkflows.value
      },
      {
        label: i18n.baseText("generic.rename"),
        value: FOLDER_LIST_ITEM_ACTIONS.RENAME,
        disabled: readOnlyEnv.value || !hasPermissionToUpdateFolders.value
      },
      {
        label: i18n.baseText("folders.actions.moveToFolder"),
        value: FOLDER_LIST_ITEM_ACTIONS.MOVE,
        disabled: readOnlyEnv.value || !hasPermissionToUpdateFolders.value
      },
      {
        label: i18n.baseText("generic.delete"),
        value: FOLDER_LIST_ITEM_ACTIONS.DELETE,
        disabled: readOnlyEnv.value || !hasPermissionToDeleteFolders.value
      }
    ]);
    const folderCardActions = computed(
      () => folderActions.value.filter(
        (action) => !action.onlyAvailableOn || action.onlyAvailableOn === "card"
      )
    );
    const mainBreadcrumbsActions = computed(
      () => folderActions.value.filter(
        (action) => !action.onlyAvailableOn || action.onlyAvailableOn === "mainBreadcrumbs"
      )
    );
    const readOnlyEnv = computed(() => sourceControlStore.preferences.branchReadOnly);
    const currentUser = computed(() => usersStore.currentUser ?? {});
    const isShareable = computed(
      () => settingsStore.isEnterpriseFeatureEnabled[EnterpriseEditionFeature.Sharing]
    );
    const foldersEnabled = computed(() => {
      return settingsStore.isFoldersFeatureEnabled;
    });
    const teamProjectsEnabled = computed(() => {
      return projectsStore.isTeamProjectFeatureEnabled;
    });
    const showFolders = computed(() => {
      return foldersEnabled.value && !projectPages.isOverviewSubPage && !projectPages.isSharedSubPage;
    });
    const currentFolder = computed(() => {
      return currentFolderId.value ? foldersStore.breadcrumbsCache[currentFolderId.value] : null;
    });
    const currentFolderParent = computed(() => {
      return currentFolder.value?.parentFolder ? foldersStore.breadcrumbsCache[currentFolder.value.parentFolder] : null;
    });
    const isDragging = computed(() => {
      return foldersStore.draggedElement !== null;
    });
    const isDragNDropEnabled = computed(() => {
      return !readOnlyEnv.value && hasPermissionToUpdateFolders.value;
    });
    const hasPermissionToCreateFolders = computed(() => {
      if (!currentProject.value) return false;
      return getResourcePermissions(currentProject.value.scopes).folder.create === true;
    });
    const hasPermissionToUpdateFolders = computed(() => {
      if (!currentProject.value) return false;
      return getResourcePermissions(currentProject.value.scopes).folder.update === true;
    });
    const hasPermissionToDeleteFolders = computed(() => {
      if (!currentProject.value) return false;
      return getResourcePermissions(currentProject.value.scopes).folder.delete === true;
    });
    const hasPermissionToCreateWorkflows = computed(() => {
      if (!currentProject.value) return false;
      return getResourcePermissions(currentProject.value.scopes).workflow.create === true;
    });
    const currentProject = computed(() => projectsStore.currentProject);
    const projectName = computed(() => {
      if (currentProject.value?.type === ProjectTypes.Personal) {
        return i18n.baseText("projects.menu.personal");
      }
      return currentProject.value?.name;
    });
    const currentParentName = computed(() => {
      if (currentFolder.value) {
        return currentFolder.value.name;
      }
      return projectName.value;
    });
    const personalProject = computed(() => {
      return projectsStore.personalProject;
    });
    const workflowListResources = computed(() => {
      const resources = (workflowsAndFolders.value || []).map((resource) => {
        if (resource.resource === "folder") {
          return {
            resourceType: "folder",
            id: resource.id,
            name: resource.name,
            createdAt: resource.createdAt.toString(),
            updatedAt: resource.updatedAt.toString(),
            homeProject: resource.homeProject,
            workflowCount: resource.workflowCount,
            subFolderCount: resource.subFolderCount,
            parentFolder: resource.parentFolder
          };
        } else {
          return {
            resourceType: "workflow",
            id: resource.id,
            name: resource.name,
            active: resource.active ?? false,
            isArchived: resource.isArchived,
            updatedAt: resource.updatedAt.toString(),
            createdAt: resource.createdAt.toString(),
            homeProject: resource.homeProject,
            scopes: resource.scopes,
            sharedWithProjects: resource.sharedWithProjects,
            readOnly: !getResourcePermissions(resource.scopes).workflow.update,
            tags: resource.tags,
            parentFolder: resource.parentFolder
          };
        }
      });
      return resources;
    });
    const statusFilterOptions = computed(() => [
      {
        label: i18n.baseText("workflows.filters.status.all"),
        value: StatusFilter.ALL
      },
      {
        label: i18n.baseText("workflows.filters.status.active"),
        value: StatusFilter.ACTIVE
      },
      {
        label: i18n.baseText("workflows.filters.status.deactivated"),
        value: StatusFilter.DEACTIVATED
      }
    ]);
    const showEasyAIWorkflowCallout = computed(() => {
      const isEasyAIWorkflowExperimentEnabled = posthogStore.getVariant(EASY_AI_WORKFLOW_EXPERIMENT.name) === EASY_AI_WORKFLOW_EXPERIMENT.variant;
      const easyAIWorkflowOnboardingDone = usersStore.isEasyAIWorkflowOnboardingDone;
      return isEasyAIWorkflowExperimentEnabled && !easyAIWorkflowOnboardingDone;
    });
    const projectPermissions = computed(() => {
      return getResourcePermissions(
        projectsStore.currentProject?.scopes ?? personalProject.value?.scopes
      );
    });
    const emptyListDescription = computed(() => {
      if (readOnlyEnv.value) {
        return i18n.baseText("workflows.empty.description.readOnlyEnv");
      } else if (!projectPermissions.value.workflow.create) {
        return i18n.baseText("workflows.empty.description.noPermission");
      } else {
        return i18n.baseText("workflows.empty.description");
      }
    });
    const hasFilters = computed(() => {
      return !!(filters.value.search || filters.value.status !== StatusFilter.ALL || filters.value.showArchived || filters.value.tags.length);
    });
    const isSelfHostedDeployment = computed(() => settingsStore.deploymentType === "default");
    const canUserRegisterCommunityPlus = computed(
      () => getResourcePermissions(usersStore.currentUser?.globalScopes).community.register
    );
    const showRegisteredCommunityCTA = computed(
      () => isSelfHostedDeployment.value && !foldersEnabled.value && canUserRegisterCommunityPlus.value
    );
    watch([() => route.params?.projectId, () => route.name], async () => {
      loading.value = true;
    });
    watch(
      () => route.params?.folderId,
      async (newVal) => {
        currentFolderId.value = newVal;
        filters.value.search = "";
        saveFiltersOnQueryString();
        await fetchWorkflows();
      }
    );
    sourceControlStore.$onAction(({ name: name2, after }) => {
      if (name2 !== "pullWorkfolder") return;
      after(async () => await initialize());
    });
    const refreshWorkflows = async () => {
      await Promise.all([
        fetchWorkflows(),
        foldersStore.fetchTotalWorkflowsAndFoldersCount(route.params.projectId)
      ]);
    };
    const onFolderDeleted = async (payload) => {
      const folderInfo = foldersStore.getCachedFolder(payload.folderId);
      foldersStore.deleteFoldersFromCache([payload.folderId, folderInfo?.parentFolder ?? ""]);
      await foldersStore.fetchTotalWorkflowsAndFoldersCount(
        route.params.projectId
      );
      if (currentFolderId.value === payload.folderId) {
        void router.push({
          name: VIEWS.PROJECTS_FOLDERS,
          params: { projectId: route.params.projectId, folderId: folderInfo?.parentFolder ?? "" }
        });
      } else {
        await fetchWorkflows();
      }
      telemetry.track("User deleted folder", {
        folder_id: payload.folderId,
        deleted_sub_folders: payload.folderCount,
        deleted_sub_workflows: payload.workflowCount
      });
    };
    onMounted(async () => {
      documentTitle.set(i18n.baseText("workflows.heading"));
      void usersStore.showPersonalizationSurvey();
      workflowListEventBus.on("resource-moved", fetchWorkflows);
      workflowListEventBus.on("workflow-duplicated", fetchWorkflows);
      workflowListEventBus.on("folder-deleted", onFolderDeleted);
      workflowListEventBus.on("folder-moved", moveFolder);
      workflowListEventBus.on("folder-transferred", onFolderTransferred);
      workflowListEventBus.on("workflow-moved", onWorkflowMoved);
      workflowListEventBus.on("workflow-transferred", onWorkflowTransferred);
    });
    onBeforeUnmount(() => {
      workflowListEventBus.off("resource-moved", fetchWorkflows);
      workflowListEventBus.off("workflow-duplicated", fetchWorkflows);
      workflowListEventBus.off("folder-deleted", onFolderDeleted);
      workflowListEventBus.off("folder-moved", moveFolder);
      workflowListEventBus.off("folder-transferred", onFolderTransferred);
      workflowListEventBus.off("workflow-moved", onWorkflowMoved);
      workflowListEventBus.off("workflow-transferred", onWorkflowTransferred);
    });
    const initialize = async () => {
      loading.value = true;
      await setFiltersFromQueryString();
      currentFolderId.value = route.params.folderId;
      const [, resourcesPage] = await Promise.all([
        usersStore.fetchUsers(),
        fetchWorkflows(),
        workflowsStore.fetchActiveWorkflows(),
        usageStore.getLicenseInfo(),
        foldersStore.fetchTotalWorkflowsAndFoldersCount(route.params.projectId)
      ]);
      breadcrumbsLoading.value = false;
      workflowsAndFolders.value = resourcesPage;
      loading.value = false;
    };
    const fetchWorkflows = async () => {
      const delayedLoading = debounce(() => {
        loading.value = true;
      }, 300);
      const routeProjectId = route.params?.projectId;
      const homeProjectFilter = filters.value.homeProject || void 0;
      const parentFolder = route.params?.folderId || void 0;
      const tags = filters.value.tags.length ? filters.value.tags.map((tagId) => tagsStore.tagsById[tagId]?.name) : [];
      const activeFilter = filters.value.status === StatusFilter.ALL ? void 0 : filters.value.status === StatusFilter.ACTIVE;
      const archivedFilter = filters.value.showArchived ? void 0 : false;
      const fetchFolders = showFolders.value && !tags.length && activeFilter === void 0;
      try {
        const fetchedResources = await workflowsStore.fetchWorkflowsPage(
          routeProjectId ?? homeProjectFilter,
          currentPage.value,
          pageSize.value,
          currentSort.value,
          {
            name: filters.value.search || void 0,
            active: activeFilter,
            isArchived: archivedFilter,
            tags: tags.length ? tags : void 0,
            parentFolderId: getParentFolderId(parentFolder)
          },
          fetchFolders,
          projectPages.isSharedSubPage
        );
        foldersStore.cacheFolders(
          fetchedResources.filter((resource) => resource.resource === "folder").map((r) => ({ id: r.id, name: r.name, parentFolder: r.parentFolder?.id }))
        );
        const isCurrentFolderCached = foldersStore.breadcrumbsCache[parentFolder ?? ""] !== void 0;
        const needToFetchFolderPath = parentFolder && !isCurrentFolderCached && routeProjectId;
        if (needToFetchFolderPath) {
          breadcrumbsLoading.value = true;
          await foldersStore.getFolderPath(routeProjectId, parentFolder);
          breadcrumbsLoading.value = false;
        }
        workflowsAndFolders.value = fetchedResources;
        showCardsBadge.value = projectPages.isOverviewSubPage || projectPages.isSharedSubPage || filters.value.search !== "";
        return fetchedResources;
      } catch (error) {
        toast.showError(error, i18n.baseText("workflows.list.error.fetching"));
        void router.push({ name: VIEWS.PROJECTS_FOLDERS, params: { projectId: routeProjectId } });
        return [];
      } finally {
        delayedLoading.cancel();
        loading.value = false;
        if (breadcrumbsLoading.value) {
          breadcrumbsLoading.value = false;
        }
      }
    };
    const getParentFolderId = (routeId) => {
      if (routeId !== null && routeId !== void 0) {
        return routeId;
      }
      if (projectPages.isOverviewSubPage || projectPages.isSharedSubPage || filters?.value.search) {
        return void 0;
      }
      return PROJECT_ROOT;
    };
    const onFiltersUpdated = async () => {
      currentPage.value = 1;
      saveFiltersOnQueryString();
      if (!loading.value) {
        await callDebounced(fetchWorkflows, { debounceTime: FILTERS_DEBOUNCE_TIME, trailing: true });
      }
    };
    const onSearchUpdated = async (search) => {
      currentPage.value = 1;
      saveFiltersOnQueryString();
      if (search) {
        await callDebounced(fetchWorkflows, { debounceTime: SEARCH_DEBOUNCE_TIME, trailing: true });
      } else {
        await fetchWorkflows();
      }
    };
    const setPaginationAndSort = async (payload) => {
      if (payload.page) {
        currentPage.value = payload.page;
      }
      if (payload.pageSize) {
        pageSize.value = payload.pageSize;
      }
      if (payload.sort) {
        currentSort.value = WORKFLOWS_SORT_MAP[payload.sort] ?? "updatedAt:desc";
      }
      if (!loading.value) {
        await callDebounced(fetchWorkflows, { debounceTime: FILTERS_DEBOUNCE_TIME, trailing: true });
      }
    };
    const onClickTag = async (tagId) => {
      if (!filters.value.tags.includes(tagId)) {
        filters.value.tags.push(tagId);
        currentPage.value = 1;
        saveFiltersOnQueryString();
        await fetchWorkflows();
      }
    };
    const saveFiltersOnQueryString = () => {
      const currentQuery = { ...route.query };
      if (filters.value.search) {
        currentQuery.search = filters.value.search;
      } else {
        delete currentQuery.search;
      }
      if (filters.value.status !== StatusFilter.ALL) {
        currentQuery.status = (filters.value.status === StatusFilter.ACTIVE).toString();
      } else {
        delete currentQuery.status;
      }
      if (filters.value.showArchived) {
        currentQuery.showArchived = "true";
      } else {
        delete currentQuery.showArchived;
      }
      if (filters.value.tags.length) {
        currentQuery.tags = filters.value.tags.join(",");
      } else {
        delete currentQuery.tags;
      }
      if (filters.value.homeProject) {
        currentQuery.homeProject = filters.value.homeProject;
      } else {
        delete currentQuery.homeProject;
      }
      void router.replace({
        query: Object.keys(currentQuery).length ? currentQuery : void 0
      });
    };
    const setFiltersFromQueryString = async () => {
      const newQuery = { ...route.query };
      const { tags, status, search, homeProject, sort, showArchived } = route.query ?? {};
      const isValidString = (value) => typeof value === "string" && value.trim().length > 0;
      if (isValidString(homeProject)) {
        await projectsStore.getAvailableProjects();
        if (isValidProjectId(homeProject)) {
          newQuery.homeProject = homeProject;
          filters.value.homeProject = homeProject;
        } else {
          delete newQuery.homeProject;
        }
      } else {
        delete newQuery.homeProject;
      }
      if (isValidString(search)) {
        newQuery.search = search;
        filters.value.search = search;
      } else {
        delete newQuery.search;
      }
      if (isValidString(tags)) {
        await tagsStore.fetchAll();
        const validTags = tags.split(",").filter((tag) => tagsStore.allTags.map((t) => t.id).includes(tag));
        if (validTags.length) {
          newQuery.tags = validTags.join(",");
          filters.value.tags = validTags;
        } else {
          delete newQuery.tags;
        }
      } else {
        delete newQuery.tags;
      }
      if (isValidString(status)) {
        newQuery.status = status;
        filters.value.status = status === "true" ? StatusFilter.ACTIVE : StatusFilter.DEACTIVATED;
      } else {
        delete newQuery.status;
      }
      if (isValidString(sort)) {
        const newSort = WORKFLOWS_SORT_MAP[sort] ?? "updatedAt:desc";
        newQuery.sort = sort;
        currentSort.value = newSort;
      } else {
        delete newQuery.sort;
      }
      if (isValidString(showArchived)) {
        newQuery.showArchived = showArchived;
        filters.value.showArchived = showArchived === "true";
      } else {
        delete newQuery.showArchived;
        filters.value.showArchived = false;
      }
      void router.replace({ query: newQuery });
    };
    const addWorkflow = () => {
      uiStore.nodeViewInitialized = false;
      void router.push({
        name: VIEWS.NEW_WORKFLOW,
        query: { projectId: route.params?.projectId, parentFolderId: route.params?.folderId }
      });
      telemetry.track("User clicked add workflow button", {
        source: "Workflows list"
      });
      trackEmptyCardClick("blank");
    };
    const trackEmptyCardClick = (option) => {
      telemetry.track("User clicked empty page option", {
        option
      });
    };
    function isValidProjectId(projectId) {
      return projectsStore.availableProjects.some((project) => project.id === projectId);
    }
    const openAIWorkflow = async (source) => {
      dismissEasyAICallout();
      telemetry.track(
        "User clicked test AI workflow",
        {
          source
        },
        { withPostHog: true }
      );
      const easyAiWorkflowJson = getEasyAiWorkflowJson();
      await router.push({
        name: VIEWS.TEMPLATE_IMPORT,
        params: { id: easyAiWorkflowJson.meta.templateId },
        query: { fromJson: "true", parentFolderId: route.params.folderId }
      });
    };
    const dismissEasyAICallout = () => {
      easyAICalloutVisible.value = false;
    };
    const onWorkflowActiveToggle = (data) => {
      const workflow = workflowsAndFolders.value.find(
        (w) => w.id === data.id
      );
      if (!workflow) return;
      workflow.active = data.active;
    };
    const getFolderListItem = (folderId) => {
      return workflowsAndFolders.value.find(
        (resource) => resource.resource === "folder" && resource.id === folderId
      );
    };
    const getFolderContent = async (folderId) => {
      const folderListItem = getFolderListItem(folderId);
      if (folderListItem) {
        return {
          workflowCount: folderListItem.workflowCount,
          subFolderCount: folderListItem.subFolderCount
        };
      }
      try {
        const content = await foldersStore.fetchFolderContent(currentProject.value?.id ?? "", folderId);
        return { workflowCount: content.totalWorkflows, subFolderCount: content.totalSubFolders };
      } catch (error) {
        toast.showMessage({
          title: i18n.baseText("folders.delete.error.message"),
          message: i18n.baseText("folders.not.found.message"),
          type: "error"
        });
        return { workflowCount: 0, subFolderCount: 0 };
      }
    };
    const onFolderCardDrop = async (event) => {
      const { draggedResource, dropTarget } = folderHelpers.handleDrop(event);
      if (!draggedResource || !dropTarget) return;
      await moveResourceOnDrop(draggedResource, dropTarget);
    };
    const onBreadCrumbsItemDrop = async (item) => {
      if (!foldersStore.draggedElement) return;
      await moveResourceOnDrop(
        {
          id: foldersStore.draggedElement.id,
          type: foldersStore.draggedElement.type,
          name: foldersStore.draggedElement.name
        },
        {
          id: item.id,
          type: "folder",
          name: item.label
        }
      );
      folderHelpers.onDragEnd();
    };
    const moveFolderToProjectRoot = async (id, name2) => {
      if (!foldersStore.draggedElement) return;
      await moveResourceOnDrop(
        {
          id: foldersStore.draggedElement.id,
          type: foldersStore.draggedElement.type,
          name: foldersStore.draggedElement.name
        },
        {
          id,
          type: "project",
          name: name2
        }
      );
      folderHelpers.onDragEnd();
    };
    const moveResourceOnDrop = async (draggedResource, dropTarget) => {
      if (draggedResource.type === "folder") {
        await moveFolder({
          folder: { id: draggedResource.id, name: draggedResource.name },
          newParent: { id: dropTarget.id, name: dropTarget.name, type: dropTarget.type },
          options: { skipFetch: true, skipNavigation: true }
        });
        workflowsAndFolders.value = workflowsAndFolders.value.filter(
          (folder) => folder.id !== draggedResource.id
        );
        const targetFolder = getFolderListItem(dropTarget.id);
        if (targetFolder) {
          targetFolder.subFolderCount += 1;
        }
      } else if (draggedResource.type === "workflow") {
        await onWorkflowMoved({
          workflow: {
            id: draggedResource.id,
            name: draggedResource.name,
            oldParentId: currentFolderId.value ?? ""
          },
          newParent: { id: dropTarget.id, name: dropTarget.name, type: dropTarget.type },
          options: { skipFetch: true }
        });
        workflowsAndFolders.value = workflowsAndFolders.value.filter(
          (workflow) => workflow.id !== draggedResource.id
        );
        const targetFolder = getFolderListItem(dropTarget.id);
        if (targetFolder) {
          targetFolder.workflowCount += 1;
        }
      }
    };
    const onBreadcrumbItemClick = (item) => {
      if (item.href) {
        loading.value = true;
        void router.push(item.href).then(() => {
          currentFolderId.value = item.id;
          loading.value = false;
        }).catch((error) => {
          toast.showError(error, i18n.baseText("folders.open.error.title"));
        });
      }
    };
    const onBreadCrumbsAction = async (action) => {
      switch (action) {
        case FOLDER_LIST_ITEM_ACTIONS.CREATE:
          if (!route.params.projectId) return;
          const currentParent = currentFolder.value?.name || projectName.value;
          if (!currentParent) return;
          await createFolder({
            id: route.params.folderId ?? "-1",
            name: currentParent,
            type: currentFolder.value ? "folder" : "project"
          });
          break;
        case FOLDER_LIST_ITEM_ACTIONS.CREATE_WORKFLOW:
          addWorkflow();
          break;
        case FOLDER_LIST_ITEM_ACTIONS.DELETE:
          if (!route.params.folderId) return;
          const content = await getFolderContent(route.params.folderId);
          await deleteFolder(
            route.params.folderId,
            content.workflowCount,
            content.subFolderCount
          );
          break;
        case FOLDER_LIST_ITEM_ACTIONS.RENAME:
          onNameToggle();
          break;
        case FOLDER_LIST_ITEM_ACTIONS.MOVE:
          if (!currentFolder.value) return;
          uiStore.openMoveToFolderModal(
            "folder",
            {
              id: currentFolder.value?.id,
              name: currentFolder.value?.name,
              parentFolderId: currentFolder.value?.parentFolder
            },
            workflowListEventBus
          );
          break;
      }
    };
    const onFolderCardAction = async (payload) => {
      const clickedFolder = foldersStore.getCachedFolder(payload.folderId);
      if (!clickedFolder) return;
      switch (payload.action) {
        case FOLDER_LIST_ITEM_ACTIONS.CREATE:
          await createFolder(
            {
              id: clickedFolder.id,
              name: clickedFolder.name,
              type: "folder"
            },
            { openAfterCreate: true }
          );
          break;
        case FOLDER_LIST_ITEM_ACTIONS.CREATE_WORKFLOW:
          currentFolderId.value = clickedFolder.id;
          void router.push({
            name: VIEWS.NEW_WORKFLOW,
            query: { projectId: route.params?.projectId, parentFolderId: clickedFolder.id }
          });
          break;
        case FOLDER_LIST_ITEM_ACTIONS.DELETE: {
          const content = await getFolderContent(clickedFolder.id);
          await deleteFolder(clickedFolder.id, content.workflowCount, content.subFolderCount);
          break;
        }
        case FOLDER_LIST_ITEM_ACTIONS.RENAME:
          await renameFolder(clickedFolder.id);
          break;
        case FOLDER_LIST_ITEM_ACTIONS.MOVE:
          uiStore.openMoveToFolderModal(
            "folder",
            {
              id: clickedFolder.id,
              name: clickedFolder.name,
              parentFolderId: clickedFolder.parentFolder
            },
            workflowListEventBus
          );
          break;
      }
    };
    const createFolder = async (parent, options = { openAfterCreate: false }) => {
      const promptResponsePromise = message.prompt(
        i18n.baseText("folders.add.to.parent.message", { interpolate: { parent: parent.name } }),
        {
          confirmButtonText: i18n.baseText("generic.create"),
          cancelButtonText: i18n.baseText("generic.cancel"),
          inputValidator: folderHelpers.validateFolderName,
          customClass: "add-folder-modal"
        }
      );
      const promptResponse = await promptResponsePromise;
      if (promptResponse.action === MODAL_CONFIRM) {
        const folderName = promptResponse.value;
        try {
          const newFolder = await foldersStore.createFolder(
            folderName,
            route.params.projectId,
            parent.type === "folder" ? parent.id : void 0
          );
          const newFolderURL = router.resolve({
            name: VIEWS.PROJECTS_FOLDERS,
            params: { projectId: route.params.projectId, folderId: newFolder.id }
          }).href;
          toast.showToast({
            title: i18n.baseText("folders.add.success.title"),
            message: i18n.baseText("folders.add.success.message", {
              interpolate: {
                link: newFolderURL,
                folderName: newFolder.name
              }
            }),
            onClick: (event) => {
              if (event?.target instanceof HTMLAnchorElement) {
                event.preventDefault();
                void router.push(newFolderURL);
              }
            },
            type: "success"
          });
          telemetry.track("User created folder", {
            folder_id: newFolder.id
          });
          if (options.openAfterCreate) {
            await router.push({
              name: VIEWS.PROJECTS_FOLDERS,
              params: { projectId: route.params.projectId, folderId: parent.id }
            });
          } else {
            if (!workflowsAndFolders.value.length) {
              workflowsAndFolders.value = [
                {
                  id: newFolder.id,
                  name: newFolder.name,
                  resource: "folder",
                  createdAt: newFolder.createdAt,
                  updatedAt: newFolder.updatedAt,
                  homeProject: projectsStore.currentProject,
                  workflowCount: 0,
                  subFolderCount: 0
                }
              ];
              foldersStore.cacheFolders([
                { id: newFolder.id, name: newFolder.name, parentFolder: currentFolder.value?.id }
              ]);
            } else {
              await fetchWorkflows();
            }
          }
        } catch (error) {
          toast.showError(error, i18n.baseText("folders.create.error.title"));
        }
      }
    };
    const renameFolder = async (folderId) => {
      const folder = foldersStore.getCachedFolder(folderId);
      if (!folder || !currentProject.value) return;
      const promptResponsePromise = message.prompt(
        i18n.baseText("folders.rename.message", { interpolate: { folderName: folder.name } }),
        {
          confirmButtonText: i18n.baseText("generic.rename"),
          cancelButtonText: i18n.baseText("generic.cancel"),
          inputValue: folder.name,
          customClass: "rename-folder-modal",
          inputValidator: folderHelpers.validateFolderName
        }
      );
      const promptResponse = await promptResponsePromise;
      if (promptResponse.action === MODAL_CONFIRM) {
        const newFolderName = promptResponse.value;
        try {
          await foldersStore.renameFolder(currentProject.value?.id, folderId, newFolderName);
          foldersStore.breadcrumbsCache[folderId].name = newFolderName;
          toast.showMessage({
            title: i18n.baseText("folders.rename.success.message", {
              interpolate: { folderName: newFolderName }
            }),
            type: "success"
          });
          await fetchWorkflows();
          telemetry.track("User renamed folder", {
            folder_id: folderId
          });
        } catch (error) {
          toast.showError(error, i18n.baseText("folders.rename.error.title"));
        }
      }
    };
    const createFolderInCurrent = async () => {
      if (showRegisteredCommunityCTA.value) {
        uiStore.openModalWithData({
          name: COMMUNITY_PLUS_ENROLLMENT_MODAL,
          data: { customHeading: i18n.baseText("folders.registeredCommunity.cta.heading") }
        });
        return;
      }
      if (!route.params.projectId) return;
      const currentParent = currentFolder.value?.name || projectName.value;
      if (!currentParent) return;
      await createFolder({
        id: route.params.folderId ?? "-1",
        name: currentParent,
        type: currentFolder.value ? "folder" : "project"
      });
    };
    const deleteFolder = async (folderId, workflowCount, subFolderCount) => {
      if (subFolderCount || workflowCount) {
        uiStore.openDeleteFolderModal(folderId, workflowListEventBus, {
          workflowCount,
          subFolderCount
        });
      } else {
        await foldersStore.deleteFolder(route.params.projectId, folderId);
        toast.showMessage({
          title: i18n.baseText("folders.delete.success.message"),
          type: "success"
        });
        await onFolderDeleted({ folderId, workflowCount, folderCount: subFolderCount });
      }
    };
    const moveFolder = async (payload) => {
      if (!route.params.projectId) return;
      try {
        await foldersStore.moveFolder(
          route.params.projectId,
          payload.folder.id,
          payload.newParent.type === "folder" ? payload.newParent.id : "0"
        );
        const isCurrentFolder = currentFolderId.value === payload.folder.id;
        const newFolderURL = router.resolve({
          name: VIEWS.PROJECTS_FOLDERS,
          params: {
            projectId: route.params.projectId,
            folderId: payload.newParent.type === "folder" ? payload.newParent.id : void 0
          }
        }).href;
        if (isCurrentFolder && !payload.options?.skipNavigation) {
          void router.push(newFolderURL);
        } else {
          toast.showToast({
            title: i18n.baseText("folders.move.success.title"),
            message: i18n.baseText("folders.move.success.message", {
              interpolate: {
                folderName: payload.folder.name,
                newFolderName: payload.newParent.name
              }
            }),
            onClick: (event) => {
              if (event?.target instanceof HTMLAnchorElement) {
                event.preventDefault();
                void router.push(newFolderURL);
              }
            },
            type: "success"
          });
          if (!payload.options?.skipFetch) {
            await fetchWorkflows();
          }
        }
      } catch (error) {
        toast.showError(error, i18n.baseText("folders.move.error.title"));
      }
    };
    const onFolderTransferred = async (payload) => {
      try {
        await foldersStore.moveFolderToProject(
          payload.source.projectId,
          payload.source.folder.id,
          payload.destination.projectId,
          payload.destination.parentFolder.id,
          payload.shareCredentials
        );
        const isCurrentFolder = currentFolderId.value === payload.source.folder.id;
        const newFolderURL = router.resolve({
          name: VIEWS.PROJECTS_FOLDERS,
          params: {
            projectId: payload.destination.canAccess ? payload.destination.projectId : payload.source.projectId,
            folderId: payload.destination.canAccess ? payload.source.folder.id : void 0
          }
        }).href;
        if (isCurrentFolder) {
          if (payload.destination.canAccess) {
            void router.push(newFolderURL);
          } else {
            void router.push({
              name: VIEWS.PROJECTS_WORKFLOWS,
              params: {
                projectId: payload.source.projectId
              }
            });
          }
        } else {
          await refreshWorkflows();
          if (payload.destination.canAccess) {
            toast.showToast({
              title: i18n.baseText("folders.move.success.title"),
              message: i18n.baseText("folders.move.success.message", {
                interpolate: {
                  folderName: payload.source.folder.name,
                  newFolderName: payload.destination.parentFolder.name
                }
              }),
              onClick: (event) => {
                if (event?.target instanceof HTMLAnchorElement) {
                  event.preventDefault();
                  void router.push(newFolderURL);
                }
              },
              type: "success"
            });
          } else {
            toast.showToast({
              title: i18n.baseText("folders.move.success.title"),
              message: i18n.baseText("folders.move.success.messageNoAccess", {
                interpolate: {
                  folderName: payload.source.folder.name,
                  newFolderName: payload.destination.parentFolder.name
                }
              }),
              type: "success"
            });
          }
        }
      } catch (error) {
        toast.showError(error, i18n.baseText("folders.move.error.title"));
      }
    };
    const moveWorkflowToFolder = async (payload) => {
      if (showRegisteredCommunityCTA.value) {
        uiStore.openModalWithData({
          name: COMMUNITY_PLUS_ENROLLMENT_MODAL,
          data: { customHeading: i18n.baseText("folders.registeredCommunity.cta.heading") }
        });
        return;
      }
      uiStore.openMoveToFolderModal(
        "workflow",
        {
          id: payload.id,
          name: payload.name,
          parentFolderId: payload.parentFolderId,
          sharedWithProjects: payload.sharedWithProjects
        },
        workflowListEventBus
      );
    };
    const onWorkflowTransferred = async (payload) => {
      try {
        await projectsStore.moveResourceToProject(
          "workflow",
          payload.source.workflow.id,
          payload.destination.projectId,
          payload.destination.parentFolder.id,
          payload.shareCredentials
        );
        await refreshWorkflows();
        if (payload.destination.canAccess) {
          toast.showToast({
            title: i18n.baseText("folders.move.workflow.success.title"),
            message: i18n.baseText("folders.move.workflow.success.message", {
              interpolate: {
                workflowName: payload.source.workflow.name,
                newFolderName: payload.destination.parentFolder.name
              }
            }),
            onClick: (event) => {
              if (event?.target instanceof HTMLAnchorElement) {
                event.preventDefault();
                void router.push({
                  name: VIEWS.PROJECTS_FOLDERS,
                  params: {
                    projectId: payload.destination.projectId,
                    folderId: payload.destination.parentFolder.id
                  }
                });
              }
            },
            type: "success"
          });
        } else {
          toast.showToast({
            title: i18n.baseText("folders.move.workflow.success.title"),
            message: i18n.baseText("folders.move.workflow.success.messageNoAccess", {
              interpolate: {
                workflowName: payload.source.workflow.name,
                newFolderName: payload.destination.parentFolder.name
              }
            }),
            type: "success"
          });
        }
      } catch (error) {
        toast.showError(error, i18n.baseText("folders.move.workflow.error.title"));
      }
    };
    const onWorkflowMoved = async (payload) => {
      if (!route.params.projectId) return;
      try {
        const newFolderURL = router.resolve({
          name: VIEWS.PROJECTS_FOLDERS,
          params: {
            projectId: route.params.projectId,
            folderId: payload.newParent.type === "folder" ? payload.newParent.id : void 0
          }
        }).href;
        const workflowResource = workflowsAndFolders.value.find(
          (resource) => resource.id === payload.workflow.id
        );
        await workflowsStore.updateWorkflow(payload.workflow.id, {
          parentFolderId: payload.newParent.type === "folder" ? payload.newParent.id : "0",
          versionId: workflowResource?.versionId
        });
        if (!payload.options?.skipFetch) {
          await fetchWorkflows();
        }
        toast.showToast({
          title: i18n.baseText("folders.move.workflow.success.title"),
          message: i18n.baseText("folders.move.workflow.success.message", {
            interpolate: {
              workflowName: payload.workflow.name,
              newFolderName: payload.newParent.name
            }
          }),
          onClick: (event) => {
            if (event?.target instanceof HTMLAnchorElement) {
              event.preventDefault();
              void router.push(newFolderURL);
            }
          },
          type: "success"
        });
        telemetry.track("User moved content", {
          workflow_id: payload.workflow.id,
          source_folder_id: payload.workflow.oldParentId,
          destination_folder_id: payload.newParent.id
        });
      } catch (error) {
        toast.showError(error, i18n.baseText("folders.move.workflow.error.title"));
      }
    };
    const onCreateWorkflowClick = () => {
      void router.push({
        name: VIEWS.NEW_WORKFLOW,
        query: {
          projectId: currentProject.value?.id,
          parentFolderId: route.params.folderId
        }
      });
    };
    const onNameToggle = () => {
      isNameEditEnabled.value = !isNameEditEnabled.value;
    };
    const onNameSubmit = async ({
      name: name2,
      onSubmit
    }) => {
      if (!currentFolder.value || !currentProject.value) return;
      const newName = name2.trim();
      if (!newName) {
        toast.showMessage({
          title: i18n.baseText("renameAction.emptyName.title"),
          message: i18n.baseText("renameAction.emptyName.message"),
          type: "error"
        });
        onSubmit(false);
        return;
      }
      if (newName === currentFolder.value.name) {
        isNameEditEnabled.value = false;
        onSubmit(true);
        return;
      }
      const validationResult = folderHelpers.validateFolderName(newName);
      if (typeof validationResult === "string") {
        toast.showMessage({
          title: i18n.baseText("renameAction.invalidName.title"),
          message: validationResult,
          type: "error"
        });
        onSubmit(false);
        return;
      } else {
        try {
          await foldersStore.renameFolder(currentProject.value?.id, currentFolder.value.id, newName);
          foldersStore.breadcrumbsCache[currentFolder.value.id].name = newName;
          toast.showMessage({
            title: i18n.baseText("folders.rename.success.message", {
              interpolate: { folderName: newName }
            }),
            type: "success"
          });
          telemetry.track("User renamed folder", {
            folder_id: currentFolder.value.id
          });
          isNameEditEnabled.value = false;
          onSubmit(true);
        } catch (error) {
          toast.showError(error, i18n.baseText("folders.rename.error.title"));
          onSubmit(false);
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_N8nButton = resolveComponent("N8nButton");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_N8nCallout = resolveComponent("N8nCallout");
      const _component_n8n_loading = resolveComponent("n8n-loading");
      const _component_InlineTextEdit = InlineTextEdit;
      const _component_FolderBreadcrumbs = __unplugin_components_0;
      const _component_FolderCard = __unplugin_components_2;
      const _component_EmptySharedSectionActionBox = _sfc_main$4;
      const _component_N8nCheckbox = resolveComponent("N8nCheckbox");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createBlock(ResourcesListLayout, {
        filters: filters.value,
        "onUpdate:filters": [
          _cache[3] || (_cache[3] = ($event) => filters.value = $event),
          onFiltersUpdated
        ],
        "resource-key": "workflows",
        type: "list-paginated",
        resources: workflowListResources.value,
        "type-props": { itemSize: 80 },
        shareable: isShareable.value,
        initialize,
        disabled: readOnlyEnv.value || !projectPermissions.value.workflow.create,
        loading: false,
        "resources-refreshing": loading.value,
        "custom-page-size": unref(DEFAULT_WORKFLOW_PAGE_SIZE),
        "total-items": unref(workflowsStore).totalWorkflowCount,
        "dont-perform-sorting-and-filtering": true,
        "has-empty-state": unref(foldersStore).totalWorkflowCount === 0 && !currentFolderId.value,
        "onClick:add": addWorkflow,
        "onUpdate:search": onSearchUpdated,
        "onUpdate:paginationAndSort": setPaginationAndSort,
        onMouseleave: unref(folderHelpers).resetDropTarget
      }, createSlots({
        header: withCtx(() => [
          createVNode(ProjectHeader, { onCreateFolder: createFolderInCurrent }, {
            default: withCtx(() => [
              unref(projectPages).isOverviewSubPage && unref(insightsStore).isSummaryEnabled ? (openBlock(), createBlock(InsightsSummary, {
                key: 0,
                loading: unref(insightsStore).weeklySummary.isLoading,
                summary: unref(insightsStore).weeklySummary.state,
                "time-range": "week"
              }, null, 8, ["loading", "summary"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        callout: withCtx(() => [
          !loading.value && showEasyAIWorkflowCallout.value && easyAICalloutVisible.value ? (openBlock(), createBlock(_component_N8nCallout, {
            key: 0,
            theme: "secondary",
            icon: "robot",
            class: normalizeClass(_ctx.$style["easy-ai-workflow-callout"])
          }, {
            trailingContent: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style["callout-trailing-content"])
              }, [
                createVNode(_component_n8n_button, {
                  "data-test-id": "easy-ai-button",
                  size: "small",
                  type: "secondary",
                  onClick: _cache[0] || (_cache[0] = ($event) => openAIWorkflow("callout"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText("generic.tryNow")), 1)
                  ]),
                  _: 1
                }),
                createVNode(unref(N8nIcon), {
                  size: "small",
                  icon: "times",
                  title: unref(i18n).baseText("generic.dismiss"),
                  class: "clickable",
                  onClick: dismissEasyAICallout
                }, null, 8, ["title"])
              ], 2)
            ]),
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("workflows.list.easyAI")) + " ", 1)
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true)
        ]),
        breadcrumbs: withCtx(() => [
          breadcrumbsLoading.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style["breadcrumbs-loading"])
          }, [
            createVNode(_component_n8n_loading, {
              loading: breadcrumbsLoading.value,
              rows: 1,
              variant: "p"
            }, null, 8, ["loading"])
          ], 2)) : showFolders.value && currentFolder.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(_ctx.$style["breadcrumbs-container"]),
            "data-test-id": "main-breadcrumbs"
          }, [
            createVNode(_component_FolderBreadcrumbs, {
              "current-folder": currentFolderParent.value,
              actions: mainBreadcrumbsActions.value,
              "hidden-items-trigger": isDragging.value ? "hover" : "click",
              "current-folder-as-link": true,
              onItemSelected: onBreadcrumbItemClick,
              onAction: onBreadCrumbsAction,
              onItemDrop: onBreadCrumbsItemDrop,
              onProjectDrop: moveFolderToProjectRoot
            }, {
              append: withCtx(() => [
                createBaseVNode("span", {
                  class: normalizeClass(_ctx.$style["path-separator"])
                }, "/", 2),
                createVNode(_component_InlineTextEdit, {
                  "data-test-id": "breadcrumbs-item-current",
                  "model-value": currentFolder.value.name,
                  "preview-value": currentFolder.value.name,
                  "is-edit-enabled": isNameEditEnabled.value,
                  "max-length": 30,
                  disabled: readOnlyEnv.value || !hasPermissionToUpdateFolders.value,
                  class: normalizeClass({ [_ctx.$style.name]: true, [_ctx.$style["pointer-disabled"]]: isDragging.value }),
                  placeholder: unref(i18n).baseText("folders.rename.placeholder"),
                  onToggle: onNameToggle,
                  onSubmit: onNameSubmit
                }, null, 8, ["model-value", "preview-value", "is-edit-enabled", "disabled", "class", "placeholder"])
              ]),
              _: 1
            }, 8, ["current-folder", "actions", "hidden-items-trigger"])
          ], 2)) : createCommentVNode("", true)
        ]),
        item: withCtx(({ item: data, index }) => [
          data.resourceType === "folder" ? (openBlock(), createBlock(Draggable, {
            key: `folder-${index}`,
            disabled: !isDragNDropEnabled.value,
            type: "move",
            "target-data-key": "folder",
            onDragstart: unref(folderHelpers).onDragStart,
            onDragend: unref(folderHelpers).onDragEnd
          }, {
            preview: withCtx(() => [
              createVNode(unref(N8nCard), null, {
                default: withCtx(() => [
                  createVNode(unref(N8nText), {
                    tag: "h2",
                    bold: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(data.name), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ]),
            default: withCtx(() => [
              createVNode(_component_FolderCard, {
                data,
                actions: folderCardActions.value,
                "read-only": readOnlyEnv.value || !hasPermissionToDeleteFolders.value && !hasPermissionToCreateFolders.value,
                "personal-project": personalProject.value,
                "data-resourceid": data.id,
                "data-resourcename": data.name,
                class: normalizeClass([{
                  ["mb-2xs"]: true,
                  [_ctx.$style["drag-active"]]: isDragging.value,
                  [_ctx.$style.dragging]: unref(foldersStore).draggedElement?.type === "folder" && unref(foldersStore).draggedElement?.id === data.id,
                  [_ctx.$style["drop-active"]]: unref(foldersStore).activeDropTarget?.id === data.id
                }, "mb-2xs"]),
                "show-ownership-badge": showCardsBadge.value,
                "data-target": "folder",
                onAction: onFolderCardAction,
                onMouseenter: unref(folderHelpers).onDragEnter,
                onMouseup: onFolderCardDrop
              }, null, 8, ["data", "actions", "read-only", "personal-project", "data-resourceid", "data-resourcename", "class", "show-ownership-badge", "onMouseenter"])
            ]),
            _: 2
          }, 1032, ["disabled", "onDragstart", "onDragend"])) : (openBlock(), createBlock(Draggable, {
            key: `workflow-${index}`,
            disabled: !isDragNDropEnabled.value,
            type: "move",
            "target-data-key": "workflow",
            onDragstart: unref(folderHelpers).onDragStart,
            onDragend: unref(folderHelpers).onDragEnd
          }, {
            preview: withCtx(() => [
              createVNode(unref(N8nCard), null, {
                default: withCtx(() => [
                  createVNode(unref(N8nText), {
                    tag: "h2",
                    bold: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(data.name), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ]),
            default: withCtx(() => [
              createVNode(WorkflowCard, {
                "data-test-id": "resources-list-item-workflow",
                class: normalizeClass({
                  ["mb-2xs"]: true,
                  [_ctx.$style["drag-active"]]: isDragging.value,
                  [_ctx.$style.dragging]: unref(foldersStore).draggedElement?.type === "workflow" && unref(foldersStore).draggedElement?.id === data.id
                }),
                data,
                "workflow-list-event-bus": unref(workflowListEventBus),
                "read-only": readOnlyEnv.value,
                "data-resourceid": data.id,
                "data-resourcename": data.name,
                "show-ownership-badge": showCardsBadge.value,
                "data-target": "workflow",
                "onClick:tag": onClickTag,
                "onWorkflow:deleted": refreshWorkflows,
                "onWorkflow:archived": refreshWorkflows,
                "onWorkflow:unarchived": refreshWorkflows,
                "onWorkflow:moved": fetchWorkflows,
                "onWorkflow:duplicated": fetchWorkflows,
                "onWorkflow:activeToggle": onWorkflowActiveToggle,
                "onAction:moveToFolder": moveWorkflowToFolder,
                onMouseenter: _cache[1] || (_cache[1] = ($event) => isDragging.value ? unref(folderHelpers).resetDropTarget() : {})
              }, null, 8, ["class", "data", "workflow-list-event-bus", "read-only", "data-resourceid", "data-resourcename", "show-ownership-badge"])
            ]),
            _: 2
          }, 1032, ["disabled", "onDragstart", "onDragend"]))
        ]),
        empty: withCtx(() => [
          unref(projectPages).isSharedSubPage && personalProject.value ? (openBlock(), createBlock(_component_EmptySharedSectionActionBox, {
            key: 0,
            "personal-project": personalProject.value,
            "resource-type": "workflows"
          }, null, 8, ["personal-project"])) : (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createVNode(unref(N8nHeading), {
                tag: "h2",
                size: "xlarge",
                class: "mb-2xs"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(currentUser.value.firstName ? unref(i18n).baseText("workflows.empty.heading", {
                    interpolate: { name: currentUser.value.firstName }
                  }) : unref(i18n).baseText("workflows.empty.heading.userNotSetup")), 1)
                ]),
                _: 1
              }),
              createVNode(unref(N8nText), {
                size: "large",
                color: "text-base"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(emptyListDescription.value), 1)
                ]),
                _: 1
              })
            ]),
            !readOnlyEnv.value && projectPermissions.value.workflow.create ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["text-center", "mt-2xl", _ctx.$style.actionsContainer])
            }, [
              createVNode(unref(N8nCard), {
                class: normalizeClass(_ctx.$style.emptyStateCard),
                hoverable: "",
                "data-test-id": "new-workflow-card",
                onClick: addWorkflow
              }, {
                default: withCtx(() => [
                  createVNode(unref(N8nIcon), {
                    class: normalizeClass(_ctx.$style.emptyStateCardIcon),
                    icon: "file"
                  }, null, 8, ["class"]),
                  createVNode(unref(N8nText), {
                    size: "large",
                    class: "mt-xs",
                    color: "text-dark"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workflows.empty.startFromScratch")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["class"]),
              showEasyAIWorkflowCallout.value ? (openBlock(), createBlock(unref(N8nCard), {
                key: 0,
                class: normalizeClass(_ctx.$style.emptyStateCard),
                hoverable: "",
                "data-test-id": "easy-ai-workflow-card",
                onClick: _cache[2] || (_cache[2] = ($event) => openAIWorkflow("empty"))
              }, {
                default: withCtx(() => [
                  createVNode(unref(N8nIcon), {
                    class: normalizeClass(_ctx.$style.emptyStateCardIcon),
                    icon: "robot"
                  }, null, 8, ["class"]),
                  createVNode(unref(N8nText), {
                    size: "large",
                    class: "mt-xs pl-2xs pr-2xs",
                    color: "text-dark"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workflows.empty.easyAI")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true)
          ]))
        ]),
        filters: withCtx(({ setKeyValue }) => [
          unref(settingsStore).areTagsEnabled ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createVNode(unref(N8nInputLabel), {
              label: unref(i18n).baseText("workflows.filters.tags"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(_sfc_main$5, {
              placeholder: unref(i18n).baseText("workflowOpen.filterWorkflows"),
              "model-value": filters.value.tags,
              "create-enabled": false,
              "onUpdate:modelValue": ($event) => setKeyValue("tags", $event)
            }, null, 8, ["placeholder", "model-value", "onUpdate:modelValue"])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_8, [
            createVNode(unref(N8nInputLabel), {
              label: unref(i18n).baseText("workflows.filters.status"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(unref(N8nSelect), {
              "data-test-id": "status-dropdown",
              "model-value": filters.value.status,
              "onUpdate:modelValue": ($event) => setKeyValue("status", $event)
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(statusFilterOptions.value, (option) => {
                  return openBlock(), createBlock(unref(_sfc_main$6), {
                    key: option.label,
                    label: option.label,
                    value: option.value,
                    "data-test-id": "status"
                  }, null, 8, ["label", "value"]);
                }), 128))
              ]),
              _: 2
            }, 1032, ["model-value", "onUpdate:modelValue"])
          ]),
          createBaseVNode("div", _hoisted_9, [
            createVNode(_component_N8nCheckbox, {
              label: unref(i18n).baseText("workflows.filters.showArchived"),
              "model-value": filters.value.showArchived || false,
              "data-test-id": "show-archived-checkbox",
              "onUpdate:modelValue": ($event) => setKeyValue("showArchived", $event)
            }, null, 8, ["label", "model-value", "onUpdate:modelValue"])
          ])
        ]),
        postamble: withCtx(() => [
          workflowsAndFolders.value.length === 0 && !hasFilters.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style["empty-folder-container"]),
            "data-test-id": "empty-folder-container"
          }, [
            unref(projectPages).isSharedSubPage && personalProject.value ? (openBlock(), createBlock(_component_EmptySharedSectionActionBox, {
              key: 0,
              "personal-project": personalProject.value,
              "resource-type": "workflows"
            }, null, 8, ["personal-project"])) : currentFolder.value ? (openBlock(), createBlock(_component_n8n_action_box, {
              key: 1,
              "data-test-id": "empty-folder-action-box",
              heading: unref(i18n).baseText("folders.empty.actionbox.title", {
                interpolate: { folderName: currentFolder.value.name }
              }),
              "button-text": unref(i18n).baseText("generic.create.workflow"),
              "button-type": "secondary",
              "button-disabled": readOnlyEnv.value || !projectPermissions.value.workflow.create,
              "onClick:button": onCreateWorkflowClick
            }, {
              disabledButtonTooltip: withCtx(() => [
                createTextVNode(toDisplayString(readOnlyEnv.value ? unref(i18n).baseText("readOnlyEnv.cantAdd.workflow") : unref(i18n).baseText("generic.missing.permissions")), 1)
              ]),
              _: 1
            }, 8, ["heading", "button-text", "button-disabled"])) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 2
      }, [
        foldersEnabled.value || showRegisteredCommunityCTA.value ? {
          name: "add-button",
          fn: withCtx(() => [
            createVNode(_component_N8nTooltip, {
              placement: "top",
              disabled: !(unref(projectPages).isOverviewSubPage || unref(projectPages).isSharedSubPage || !readOnlyEnv.value && hasPermissionToCreateFolders.value)
            }, {
              content: withCtx(() => [
                (unref(projectPages).isOverviewSubPage || unref(projectPages).isSharedSubPage) && !showRegisteredCommunityCTA.value ? (openBlock(), createElementBlock("span", _hoisted_1, [
                  teamProjectsEnabled.value ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(unref(i18n).baseText("folders.add.overview.withProjects.message")), 1)) : (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(unref(i18n).baseText("folders.add.overview.community.message")), 1))
                ])) : (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(currentParentName.value ? unref(i18n).baseText("folders.add.to.parent.message", {
                  interpolate: { parent: currentParentName.value }
                }) : unref(i18n).baseText("folders.add.here.message")), 1))
              ]),
              default: withCtx(() => [
                createVNode(_component_N8nButton, {
                  size: "small",
                  icon: "folder-plus",
                  type: "tertiary",
                  "data-test-id": "add-folder-button",
                  class: normalizeClass(_ctx.$style["add-folder-button"]),
                  disabled: !showRegisteredCommunityCTA.value && (readOnlyEnv.value || !hasPermissionToCreateFolders.value),
                  onClick: createFolderInCurrent
                }, null, 8, ["class", "disabled"])
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["filters", "resources", "shareable", "disabled", "resources-refreshing", "custom-page-size", "total-items", "has-empty-state", "onMouseleave"]);
    };
  }
});
const actionsContainer = "_actionsContainer_6309i_123";
const emptyStateCard = "_emptyStateCard_6309i_139";
const emptyStateCardIcon = "_emptyStateCardIcon_6309i_152";
const dragging = "_dragging_6309i_187";
const name = "_name_6309i_205";
const style0 = {
  actionsContainer,
  "easy-ai-workflow-callout": "_easy-ai-workflow-callout_6309i_128",
  "callout-trailing-content": "_callout-trailing-content_6309i_133",
  emptyStateCard,
  emptyStateCardIcon,
  "add-folder-button": "_add-folder-button_6309i_161",
  "breadcrumbs-container": "_breadcrumbs-container_6309i_166",
  "breadcrumbs-loading": "_breadcrumbs-loading_6309i_172",
  "empty-folder-container": "_empty-folder-container_6309i_178",
  "drag-active": "_drag-active_6309i_182",
  dragging,
  "drop-active": "_drop-active_6309i_194",
  "path-separator": "_path-separator_6309i_199",
  name,
  "pointer-disabled": "_pointer-disabled_6309i_210"
};
const cssModules = {
  "$style": style0
};
const WorkflowsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkflowsView as default
};
