(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../libs/df-components/src/index.ts":
/*!***************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/index.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/df-components.module */ "../../libs/df-components/src/lib/df-components.module.ts"), exports);
var electorate_selector_1 = __webpack_require__(/*! ./lib/electorate-selector */ "../../libs/df-components/src/lib/electorate-selector/index.ts");
exports.ElectorateSelectorComponent = electorate_selector_1.ElectorateSelectorComponent;
var busy_component_1 = __webpack_require__(/*! ./lib/busy.component */ "../../libs/df-components/src/lib/busy.component.ts");
exports.BusyComponent = busy_component_1.BusyComponent;
var related_artifacts_component_1 = __webpack_require__(/*! ./lib/related-artifacts/related-artifacts.component */ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.ts");
exports.RelatedArtifactsComponent = related_artifacts_component_1.RelatedArtifactsComponent;
var contact_card_component_1 = __webpack_require__(/*! ./lib/contact-card/contact-card.component */ "../../libs/df-components/src/lib/contact-card/contact-card.component.ts");
exports.ContactCardComponent = contact_card_component_1.ContactCardComponent;
var page_title_component_1 = __webpack_require__(/*! ./lib/page-title.component */ "../../libs/df-components/src/lib/page-title.component.ts");
exports.PageTitleComponent = page_title_component_1.PageTitleComponent;
var avatar_component_1 = __webpack_require__(/*! ./lib/avatar/avatar.component */ "../../libs/df-components/src/lib/avatar/avatar.component.ts");
exports.AvatarComponent = avatar_component_1.AvatarComponent;
var info_component_1 = __webpack_require__(/*! ./lib/info/info.component */ "../../libs/df-components/src/lib/info/info.component.ts");
exports.InfoComponent = info_component_1.InfoComponent;


/***/ }),

/***/ "../../libs/df-components/src/lib/avatar/avatar.component.html":
/*!***************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/avatar/avatar.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"avatar\"\r\n     *ngIf=\"props\"\r\n     [style.background-color]=\"props.background\"\r\n     [style.width]=\"props.size\"\r\n     [style.line-height]='props.lineheight'\r\n     [style.height]='props.size'\r\n     [style.font-size]='props.fontSize'\r\n     [style.border-radius]='props.borderradius'>\r\n      <span [style.color]='fontColor'>{{letter}}</span>\r\n</div>"

/***/ }),

/***/ "../../libs/df-components/src/lib/avatar/avatar.component.scss":
/*!***************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/avatar/avatar.component.scss ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".avatar {\n  text-align: center;\n  overflow: hidden; }\n  .avatar img {\n    vertical-align: top; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2F2YXRhci9DOlxcVXNlcnNcXGFqa2l0c29uXFxyZXBvc1xcREYtQ2xpZW50XFxkaWdpdGFsLWZpcnN0L2xpYnNcXGRmLWNvbXBvbmVudHNcXHNyY1xcbGliXFxhdmF0YXJcXGF2YXRhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFtQjtFQUNuQixnQkFBbUIsRUFBQTtFQUZ2QjtJQUtNLG1CQUFtQixFQUFBIiwiZmlsZSI6ImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2F2YXRhci9hdmF0YXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYXZhdGFyIHtcclxuICAgIHRleHQtYWxpZ24gOiBjZW50ZXI7XHJcbiAgICBvdmVyZmxvdyAgIDogaGlkZGVuO1xyXG4gIFxyXG4gICAgaW1nIHtcclxuICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgIH1cclxuICB9Il19 */"

/***/ }),

/***/ "../../libs/df-components/src/lib/avatar/avatar.component.ts":
/*!*************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/avatar/avatar.component.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var AvatarComponent = /** @class */ (function () {
    function AvatarComponent() {
        this.size = 100;
        this.background = this.getRandomColor();
        this.displayType = 'none';
        this.letter = '?';
        this.defaultProtocol = null;
        this.fontSize = 49;
        this.fontColor = '#FFFFFF';
        this.props = null;
    }
    Object.defineProperty(AvatarComponent.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (val) {
            this._email = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    AvatarComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    AvatarComponent.prototype.getLetterColor = function (letters) {
        var padded = letters.padEnd(3, '~').substring(0, 3);
        var color = this.ascii_to_hexa(padded);
        return "#" + color;
    };
    AvatarComponent.prototype.ascii_to_hexa = function (str) {
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n++) {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    };
    /**
     * Set the avatar letter based on full name or email
     */
    AvatarComponent.prototype.getLetter = function () {
        if (this.name && this.name.length) {
            var nameInitials = this.name.match(/\b(\w)/g);
            if (nameInitials) {
                var nameLetters = nameInitials.slice(0, 3).join('');
                this.letter = nameLetters.toUpperCase();
            }
            else {
                this.letter = this.name[0];
            }
        }
        else if (this.email && this.email.length) {
            var emailInitials = this.email.split('@')[0].match(/\b(\w)/g);
            var emailLetters = emailInitials.slice(0, 3).join('');
            this.letter = emailLetters.toUpperCase();
        }
        this.background = this.getLetterColor(this.letter);
    };
    AvatarComponent.prototype.setCssProps = function () {
        this.fontSize = (39 * this.size) / 100;
        this.props = {
            size: this.size + "px",
            lineheight: this.size + "px",
            background: this.background,
            fontSize: this.fontSize + "px"
        };
        switch (this.displayType) {
            case 'rounded':
                this.props['borderradius'] = '5%';
                break;
            case 'circle':
                this.props['borderradius'] = '50%';
                break;
            default:
                this.props['borderradius'] = '0';
        }
    };
    /**
     * Set avatar size, background and display type
     */
    AvatarComponent.prototype.ngOnInit = function () {
        this.setCssProps();
        this.getLetter();
    };
    /**
     * Updates avatar image and letter on email updates
     */
    AvatarComponent.prototype.ngOnChanges = function () {
        this.getLetter();
    };
    tslib_1.__decorate([
        core_1.Input('email'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], AvatarComponent.prototype, "email", null);
    tslib_1.__decorate([
        core_1.Input('name'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], AvatarComponent.prototype, "name", null);
    tslib_1.__decorate([
        core_1.Input('size'),
        tslib_1.__metadata("design:type", Object)
    ], AvatarComponent.prototype, "size", void 0);
    tslib_1.__decorate([
        core_1.Input('background'),
        tslib_1.__metadata("design:type", Object)
    ], AvatarComponent.prototype, "background", void 0);
    tslib_1.__decorate([
        core_1.Input('displayType'),
        tslib_1.__metadata("design:type", Object)
    ], AvatarComponent.prototype, "displayType", void 0);
    tslib_1.__decorate([
        core_1.Input('defaultProtocol'),
        tslib_1.__metadata("design:type", String)
    ], AvatarComponent.prototype, "defaultProtocol", void 0);
    AvatarComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-avatar',
            template: __webpack_require__(/*! ./avatar.component.html */ "../../libs/df-components/src/lib/avatar/avatar.component.html"),
            styles: [__webpack_require__(/*! ./avatar.component.scss */ "../../libs/df-components/src/lib/avatar/avatar.component.scss")]
        })
    ], AvatarComponent);
    return AvatarComponent;
}());
exports.AvatarComponent = AvatarComponent;


/***/ }),

/***/ "../../libs/df-components/src/lib/busy.component.ts":
/*!****************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/busy.component.ts ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var BusyComponent = /** @class */ (function () {
    function BusyComponent() {
        this.icon = 'autorenew';
        this.title = 'Busy';
    }
    BusyComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], BusyComponent.prototype, "icon", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], BusyComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], BusyComponent.prototype, "busy", void 0);
    BusyComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-busy',
            template: "\n  <button attr.aria-label=\"{{title}}\" *ngIf=\"busy\" title=\"{{title}}\" mdc-button><mdc-icon class=\"heartbeat\">{{icon}}</mdc-icon><span [innerHtml]=\"title | safeHtml\"></span></button>\n",
            styles: ["\n:host {\n  padding-right:4px;\n}\n"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], BusyComponent);
    return BusyComponent;
}());
exports.BusyComponent = BusyComponent;


/***/ }),

/***/ "../../libs/df-components/src/lib/contact-card/contact-card.component.html":
/*!***************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/contact-card/contact-card.component.html ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mdc-card class=\"contact-card\">\r\n  <mdc-card-primary-action>\r\n    <div class=\"app-card__primary\">\r\n      <h2 class=\"app-card__title\" mdcHeadline6>{{contact?.name}}</h2>\r\n      <h3 class=\"app-card__subtitle\" mdcSubtitle2>{{contact?.portfolio?.title | truncate:40}}</h3>\r\n    </div>\r\n    <div class=\"app-card__secondary\" mdcBody2>\r\n      <mdc-list twoLine dense>\r\n        <mdc-list-item>\r\n          <mdc-icon mdcListItemGraphic>phone</mdc-icon>\r\n          <mdc-list-item-text secondaryText=\"work\">{{contact?.phone}}</mdc-list-item-text>\r\n        </mdc-list-item>\r\n        <mdc-list-item (click)=\"onMailClicked.emit(contact)\">\r\n          <mdc-icon mdcListItemGraphic>alternate_email</mdc-icon>\r\n          <mdc-list-item-text secondaryText=\"work\">{{contact?.email}}</mdc-list-item-text>\r\n        </mdc-list-item>\r\n      </mdc-list>\r\n    </div>\r\n  </mdc-card-primary-action>\r\n</mdc-card>"

/***/ }),

/***/ "../../libs/df-components/src/lib/contact-card/contact-card.component.scss":
/*!***************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/contact-card/contact-card.component.scss ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".contact-card {\n  margin: 8px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2NvbnRhY3QtY2FyZC9DOlxcVXNlcnNcXGFqa2l0c29uXFxyZXBvc1xcREYtQ2xpZW50XFxkaWdpdGFsLWZpcnN0L2xpYnNcXGRmLWNvbXBvbmVudHNcXHNyY1xcbGliXFxjb250YWN0LWNhcmRcXGNvbnRhY3QtY2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQVcsRUFBQSIsImZpbGUiOiJsaWJzL2RmLWNvbXBvbmVudHMvc3JjL2xpYi9jb250YWN0LWNhcmQvY29udGFjdC1jYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhY3QtY2FyZCB7IFxyXG4gICAgbWFyZ2luOiA4cHg7XHJcbn0iXX0= */"

/***/ }),

/***/ "../../libs/df-components/src/lib/contact-card/contact-card.component.ts":
/*!*************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/contact-card/contact-card.component.ts ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var ContactCardComponent = /** @class */ (function () {
    function ContactCardComponent() {
        this.onMailClicked = new core_1.EventEmitter();
    }
    ContactCardComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContactCardComponent.prototype, "contact", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", core_1.EventEmitter)
    ], ContactCardComponent.prototype, "onMailClicked", void 0);
    ContactCardComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-contact-card',
            template: __webpack_require__(/*! ./contact-card.component.html */ "../../libs/df-components/src/lib/contact-card/contact-card.component.html"),
            styles: [__webpack_require__(/*! ./contact-card.component.scss */ "../../libs/df-components/src/lib/contact-card/contact-card.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ContactCardComponent);
    return ContactCardComponent;
}());
exports.ContactCardComponent = ContactCardComponent;


/***/ }),

/***/ "../../libs/df-components/src/lib/df-components.module.ts":
/*!**********************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/df-components.module.ts ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
var common_1 = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
var ng_select_1 = __webpack_require__(/*! @ng-select/ng-select */ "../../node_modules/@ng-select/ng-select/fesm5/ng-select.js");
var df_pipes_1 = __webpack_require__(/*! @digital-first/df-pipes */ "../../libs/df-pipes/src/index.ts");
var df_theme_1 = __webpack_require__(/*! @digital-first/df-theme */ "../../libs/df-theme/src/index.ts");
var contact_card_component_1 = __webpack_require__(/*! ./contact-card/contact-card.component */ "../../libs/df-components/src/lib/contact-card/contact-card.component.ts");
var page_title_component_1 = __webpack_require__(/*! ./page-title.component */ "../../libs/df-components/src/lib/page-title.component.ts");
var related_artifacts_component_1 = __webpack_require__(/*! ./related-artifacts/related-artifacts.component */ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.ts");
var busy_component_1 = __webpack_require__(/*! ./busy.component */ "../../libs/df-components/src/lib/busy.component.ts");
var electorate_selector_component_1 = __webpack_require__(/*! ./electorate-selector/electorate-selector.component */ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.ts");
var avatar_component_1 = __webpack_require__(/*! ./avatar/avatar.component */ "../../libs/df-components/src/lib/avatar/avatar.component.ts");
var info_component_1 = __webpack_require__(/*! ./info/info.component */ "../../libs/df-components/src/lib/info/info.component.ts");
var COMPONENTS = [
    contact_card_component_1.ContactCardComponent,
    page_title_component_1.PageTitleComponent,
    related_artifacts_component_1.RelatedArtifactsComponent,
    busy_component_1.BusyComponent,
    electorate_selector_component_1.ElectorateSelectorComponent,
    avatar_component_1.AvatarComponent,
    info_component_1.InfoComponent,
];
var DfComponentsModule = /** @class */ (function () {
    function DfComponentsModule() {
    }
    DfComponentsModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ng_select_1.NgSelectModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                df_pipes_1.DfPipesModule,
                df_theme_1.DfThemeModule
            ],
            declarations: COMPONENTS.slice(),
            exports: COMPONENTS.slice()
        })
    ], DfComponentsModule);
    return DfComponentsModule;
}());
exports.DfComponentsModule = DfComponentsModule;


/***/ }),

/***/ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.html":
/*!*****************************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/electorate-selector/electorate-selector.component.html ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-content\">\r\n  <div class=\"form-layout__row--no-wrap form-layout__row-with-button\">\r\n    <ng-select [items]=\"_electorates\" bindValue=\"id\" bindLabel=\"title\" placeholder=\"Select Electorate\" [formControl]=\"selectControl\">\r\n    </ng-select>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n\r\n<div class=\"app-layout__row\">\r\n  <mdc-chip-set input>\r\n    <mdc-chip *ngFor=\"let electorate of selected\" [label]=\"electorate.title\" (removed)=\"handleRemove(electorate)\">\r\n      <mdc-chip-icon trailing>cancel</mdc-chip-icon>\r\n    </mdc-chip>\r\n  </mdc-chip-set>\r\n</div>"

/***/ }),

/***/ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.scss":
/*!*****************************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/electorate-selector/electorate-selector.component.scss ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .mdc-select {\n  width: 100%;\n  width: -webkit-fill-available; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2VsZWN0b3JhdGUtc2VsZWN0b3IvQzpcXFVzZXJzXFxhamtpdHNvblxccmVwb3NcXERGLUNsaWVudFxcZGlnaXRhbC1maXJzdC9saWJzXFxkZi1jb21wb25lbnRzXFxzcmNcXGxpYlxcZWxlY3RvcmF0ZS1zZWxlY3RvclxcZWxlY3RvcmF0ZS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVRLFdBQVU7RUFDViw2QkFBNkIsRUFBQSIsImZpbGUiOiJsaWJzL2RmLWNvbXBvbmVudHMvc3JjL2xpYi9lbGVjdG9yYXRlLXNlbGVjdG9yL2VsZWN0b3JhdGUtc2VsZWN0b3IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICAubWRjLXNlbGVjdCB7XHJcbiAgICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgICB3aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTtcclxuICAgIH1cclxufVxyXG4gICJdfQ== */"

/***/ }),

/***/ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.ts":
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/electorate-selector/electorate-selector.component.ts ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
var utils_1 = __webpack_require__(/*! @df/utils */ "../../node_modules/@df/utils/fesm5/df-utils.js");
var ElectorateSelectorComponent = /** @class */ (function () {
    function ElectorateSelectorComponent() {
        this.onAddElectorate = new core_1.EventEmitter();
        this.onRemoveElectorate = new core_1.EventEmitter();
    }
    Object.defineProperty(ElectorateSelectorComponent.prototype, "electorates", {
        set: function (val) {
            this._electorates = val;
            this._electorates.sort(utils_1.sortBy('title'));
        },
        enumerable: true,
        configurable: true
    });
    ElectorateSelectorComponent.prototype.ngOnInit = function () {
        // create search FormControl
        this.selectControl = new forms_1.FormControl();
    };
    ElectorateSelectorComponent.prototype.handleSelect = function ($event) {
        var id = $event.target.value;
        this.onAddElectorate.emit(this._electorates.find(function (e) { return e.id === id; }));
        this.selectControl.setValue(null);
    };
    ElectorateSelectorComponent.prototype.handleRemove = function ($event) {
        this.onRemoveElectorate.emit($event);
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ElectorateSelectorComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ElectorateSelectorComponent.prototype, "electorates", null);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", core_1.EventEmitter)
    ], ElectorateSelectorComponent.prototype, "onAddElectorate", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", core_1.EventEmitter)
    ], ElectorateSelectorComponent.prototype, "onRemoveElectorate", void 0);
    ElectorateSelectorComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-electorate-selector',
            template: __webpack_require__(/*! ./electorate-selector.component.html */ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.html"),
            styles: [__webpack_require__(/*! ./electorate-selector.component.scss */ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ElectorateSelectorComponent);
    return ElectorateSelectorComponent;
}());
exports.ElectorateSelectorComponent = ElectorateSelectorComponent;


/***/ }),

/***/ "../../libs/df-components/src/lib/electorate-selector/index.ts":
/*!***************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/electorate-selector/index.ts ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./electorate-selector.component */ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.ts"), exports);


/***/ }),

/***/ "../../libs/df-components/src/lib/info/info.component.html":
/*!***********************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/info/info.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"df-card-info\">\r\n  <div class=\"df-card-info-row\">\r\n    <div class=\"df-card-info-body\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../libs/df-components/src/lib/info/info.component.scss":
/*!***********************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/info/info.component.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".df-card-info {\n  margin: 5px 15px;\n  padding: 5px 15px; }\n\n.df-card-info-row {\n  display: flex; }\n\n.df-card-info-body {\n  font-style: italic;\n  color: lightgrey; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2luZm8vQzpcXFVzZXJzXFxhamtpdHNvblxccmVwb3NcXERGLUNsaWVudFxcZGlnaXRhbC1maXJzdC9saWJzXFxkZi1jb21wb25lbnRzXFxzcmNcXGxpYlxcaW5mb1xcaW5mby5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGdCQUFnQjtFQUNoQixpQkFBaUIsRUFBQTs7QUFFckI7RUFDSSxhQUFhLEVBQUE7O0FBRWpCO0VBQ0ksa0JBQWtCO0VBQ2xCLGdCQUFnQixFQUFBIiwiZmlsZSI6ImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2luZm8vaW5mby5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4uZGYtY2FyZC1pbmZvIHtcclxuICAgIG1hcmdpbjogNXB4IDE1cHg7XHJcbiAgICBwYWRkaW5nOiA1cHggMTVweDtcclxufVxyXG4uZGYtY2FyZC1pbmZvLXJvdyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5kZi1jYXJkLWluZm8tYm9keSB7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICBjb2xvcjogbGlnaHRncmV5O1xyXG59Il19 */"

/***/ }),

/***/ "../../libs/df-components/src/lib/info/info.component.ts":
/*!*********************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/info/info.component.ts ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var InfoComponent = /** @class */ (function () {
    function InfoComponent() {
    }
    InfoComponent.prototype.ngOnInit = function () {
    };
    InfoComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-info',
            template: __webpack_require__(/*! ./info.component.html */ "../../libs/df-components/src/lib/info/info.component.html"),
            styles: [__webpack_require__(/*! ./info.component.scss */ "../../libs/df-components/src/lib/info/info.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], InfoComponent);
    return InfoComponent;
}());
exports.InfoComponent = InfoComponent;


/***/ }),

/***/ "../../libs/df-components/src/lib/page-title.component.ts":
/*!**********************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/page-title.component.ts ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var utils_1 = __webpack_require__(/*! @df/utils */ "../../node_modules/@df/utils/fesm5/df-utils.js");
var PageTitleComponent = /** @class */ (function () {
    function PageTitleComponent() {
        this.onTitleClicked = new core_1.EventEmitter();
    }
    Object.defineProperty(PageTitleComponent.prototype, "background", {
        set: function (hexcolour) {
            this._background = hexcolour;
            this._textColour = utils_1.getContrastYIQ(hexcolour);
        },
        enumerable: true,
        configurable: true
    });
    PageTitleComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], PageTitleComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], PageTitleComponent.prototype, "background", null);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", core_1.EventEmitter)
    ], PageTitleComponent.prototype, "onTitleClicked", void 0);
    PageTitleComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-page-title',
            template: "\n  <div class=\"page_title\" [style.background-color]=\"_background\" [style.color]=\"_textColour\">\n    <div class=\"reader-card-article__title page_title_text\" mdcHeadline5 (click)=\"onTitleClicked.emit($event)\">{{title | titlecase}}</div>\n    <ng-content></ng-content>\n  </div>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PageTitleComponent);
    return PageTitleComponent;
}());
exports.PageTitleComponent = PageTitleComponent;


/***/ }),

/***/ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.html":
/*!*************************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/related-artifacts/related-artifacts.component.html ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mdc-list twoLine dense>\r\n  <mdc-list-item *ngFor=\"let link of links\">\r\n    <mdc-icon mdcListItemGraphic>link</mdc-icon>\r\n    <mdc-list-item-text secondaryText=\"commitment\">Commitment Name</mdc-list-item-text>\r\n    <a mdcListItemMeta mdcIcon aria-label=\"Delete this Item\" title=\"Delete this Item\" (click)=\"onDeleteRelated.emit(link)\">delete_forever</a>\r\n  </mdc-list-item>\r\n</mdc-list>\r\n<button mdc-button (click)=\"onAddRelated.emit()\">\r\n  <mdc-icon>add</mdc-icon>Add Related Artifact\r\n</button>"

/***/ }),

/***/ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.scss":
/*!*************************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/related-artifacts/related-artifacts.component.scss ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  min-width: 50%;\n  width: 100%;\n  width: -webkit-fill-available;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL3JlbGF0ZWQtYXJ0aWZhY3RzL0M6XFxVc2Vyc1xcYWpraXRzb25cXHJlcG9zXFxERi1DbGllbnRcXGRpZ2l0YWwtZmlyc3QvbGlic1xcZGYtY29tcG9uZW50c1xcc3JjXFxsaWJcXHJlbGF0ZWQtYXJ0aWZhY3RzXFxyZWxhdGVkLWFydGlmYWN0cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQWM7RUFDZCxXQUFVO0VBQ1YsNkJBQTZCO0VBQzdCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsMkJBQTJCLEVBQUEiLCJmaWxlIjoibGlicy9kZi1jb21wb25lbnRzL3NyYy9saWIvcmVsYXRlZC1hcnRpZmFjdHMvcmVsYXRlZC1hcnRpZmFjdHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBtaW4td2lkdGg6IDUwJTtcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgICB3aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTtcclxuICAgIGRpc3BsYXk6IGZsZXg7IFxyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxufSAiXX0= */"

/***/ }),

/***/ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.ts":
/*!***********************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-components/src/lib/related-artifacts/related-artifacts.component.ts ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var RelatedLink = /** @class */ (function () {
    function RelatedLink() {
    }
    return RelatedLink;
}());
exports.RelatedLink = RelatedLink;
var RelatedArtifactsComponent = /** @class */ (function () {
    function RelatedArtifactsComponent() {
        this.onDeleteRelated = new core_1.EventEmitter();
        this.onAddRelated = new core_1.EventEmitter();
    }
    RelatedArtifactsComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], RelatedArtifactsComponent.prototype, "links", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", core_1.EventEmitter)
    ], RelatedArtifactsComponent.prototype, "onDeleteRelated", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", core_1.EventEmitter)
    ], RelatedArtifactsComponent.prototype, "onAddRelated", void 0);
    RelatedArtifactsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-related-artifacts',
            template: __webpack_require__(/*! ./related-artifacts.component.html */ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.html"),
            styles: [__webpack_require__(/*! ./related-artifacts.component.scss */ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RelatedArtifactsComponent);
    return RelatedArtifactsComponent;
}());
exports.RelatedArtifactsComponent = RelatedArtifactsComponent;


/***/ }),

/***/ "../../libs/df-layouts/src/index.ts":
/*!************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/index.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/simple-layout/simple-layout.component */ "../../libs/df-layouts/src/lib/simple-layout/simple-layout.component.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/full-layout/full-layout.component */ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/full-layout/full-layout.service */ "../../libs/df-layouts/src/lib/full-layout/full-layout.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/title-layout/title-layout.component */ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/title-layout/title-layout.service */ "../../libs/df-layouts/src/lib/title-layout/title-layout.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/df-layouts.module */ "../../libs/df-layouts/src/lib/df-layouts.module.ts"), exports);


/***/ }),

/***/ "../../libs/df-layouts/src/lib/df-layouts.module.ts":
/*!****************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/df-layouts.module.ts ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
var router_1 = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
var simple_layout_component_1 = __webpack_require__(/*! ./simple-layout/simple-layout.component */ "../../libs/df-layouts/src/lib/simple-layout/simple-layout.component.ts");
var full_layout_component_1 = __webpack_require__(/*! ./full-layout/full-layout.component */ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.ts");
var df_theme_1 = __webpack_require__(/*! @digital-first/df-theme */ "../../libs/df-theme/src/index.ts");
var full_layout_service_1 = __webpack_require__(/*! ./full-layout/full-layout.service */ "../../libs/df-layouts/src/lib/full-layout/full-layout.service.ts");
var df_components_1 = __webpack_require__(/*! @digital-first/df-components */ "../../libs/df-components/src/index.ts");
var title_layout_component_1 = __webpack_require__(/*! ./title-layout/title-layout.component */ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.ts");
var title_layout_service_1 = __webpack_require__(/*! ./title-layout/title-layout.service */ "../../libs/df-layouts/src/lib/title-layout/title-layout.service.ts");
var COMPONENTS = [simple_layout_component_1.SimpleLayoutComponent, title_layout_component_1.TitleLayoutComponent, full_layout_component_1.FullLayoutComponent];
var DfLayoutsModule = /** @class */ (function () {
    function DfLayoutsModule() {
    }
    DfLayoutsModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                df_theme_1.DfThemeModule,
                df_components_1.DfComponentsModule
            ],
            declarations: COMPONENTS.slice(),
            exports: COMPONENTS.slice(),
            providers: [title_layout_service_1.TitleLayoutService, full_layout_service_1.FullLayoutService]
        })
    ], DfLayoutsModule);
    return DfLayoutsModule;
}());
exports.DfLayoutsModule = DfLayoutsModule;


/***/ }),

/***/ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.html":
/*!**********************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/full-layout/full-layout.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mdc-top-app-bar class=\"app-top-app-bar\" #topAppBar fixed prominent='false'>\r\n    <mdc-top-app-bar-row>\r\n        <mdc-top-app-bar-section align=\"start\" title=\"{{title}}\" >\r\n            <mdc-icon mdcAppBarNavIcon *ngIf=\"isScreenSmall()\" (click)=\"drawOpenToggleClicked(!drawOpen)\">menu</mdc-icon>\r\n            <mdc-icon mdcTopAppBarActionItem [routerLink]=\"['/']\">home</mdc-icon>\r\n        </mdc-top-app-bar-section>\r\n        <mdc-top-app-bar-section align=\"center\"class=\"protective-marking\">\r\n            <span >{{(protectiveMarking$ | async) | uppercase}}</span> \r\n        </mdc-top-app-bar-section>\r\n        <mdc-top-app-bar-section align=\"end\">\r\n            <!-- <a mdcAppBarActionItem href=\"https://github.com/trimox/angular-mdc-web\" alt=\"GitHub\" target=\"_blank\" rel=\"noopener noreferrer\">\r\n            <mdc-icon>\r\n              <img src=\"https://trimox.github.io/angular-mdc-web/assets/github-circle-white-transparent.svg\" height=\"24\" />\r\n            </mdc-icon>\r\n          </a>  -->\r\n            <span class=\"app-layout-title-version\">{{version}}</span>\r\n            <digital-first-avatar [name]=\"profile?.name\" [email]=\"profile?.email\" [displayType]=\"profile?.displayType\"\r\n                [size]=\"profile?.size\" [background]=\"profile?.background\">\r\n            </digital-first-avatar>\r\n            <mdc-icon mdcTopAppBarActionItem (click)=\"profileMenu.open = !profileMenu.open\">more_vert</mdc-icon>\r\n            <div mdcMenuSurfaceAnchor #menuAnchor>\r\n                <mdc-menu #profileMenu [anchorElement]=\"menuAnchor\">\r\n                  <mdc-list>\r\n                    <mdc-list-item *ngFor=\"let item of sidebarItems$ | async\">\r\n                        <a *ngIf=\"!item.divider\" mdc-list-item [routerLink]=\"item.routerLink\" routerLinkActive=\"app-drawer-link-active\">\r\n                            <mdc-icon mdcListItemGraphic>{{item.icon}}</mdc-icon>{{item.caption}}\r\n                        </a>\r\n                    </mdc-list-item>\r\n                  </mdc-list>\r\n                </mdc-menu>\r\n            </div>\r\n        </mdc-top-app-bar-section>\r\n    </mdc-top-app-bar-row>\r\n    <mdc-linear-progress [open]=\"(open$ | async)\"></mdc-linear-progress>\r\n</mdc-top-app-bar>\r\n\r\n\r\n<mdc-drawer #appdrawer=\"mdcDrawer\" [open]=\"drawOpen || !isScreenSmall()\" [drawer]=\"isScreenSmall() ? 'modal' : 'dismissible'\" (opened)=\"handleOpened($event)\" (closed)=\"handleClosed($event)\" mdcTopAppBarFixedAdjust>\r\n    <mdc-drawer-content>\r\n        <mdc-list *ngFor=\"let item of sidebarItems$ | async\" >\r\n            <a *ngIf=\"!item.divider\" mdc-list-item [routerLink]=\"item.routerLink\" routerLinkActive=\"app-drawer-link-active\">\r\n                <mdc-icon mdcListItemGraphic>{{item.icon}}</mdc-icon>{{item.caption}}\r\n            </a>\r\n            <mdc-list-divider *ngIf=\"item.divider\"></mdc-list-divider>\r\n        </mdc-list>\r\n    </mdc-drawer-content>\r\n\r\n</mdc-drawer>\r\n<div mdcDrawerAppContent mdcTopAppBarFixedAdjust>\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.scss":
/*!**********************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/full-layout/full-layout.component.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".protective-marking {\n  justify-content: center; }\n\n.protective-marking-row {\n  height: 20px; }\n\n.notification {\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtbGF5b3V0cy9zcmMvbGliL2Z1bGwtbGF5b3V0L0M6XFxVc2Vyc1xcYWpraXRzb25cXHJlcG9zXFxERi1DbGllbnRcXGRpZ2l0YWwtZmlyc3QvbGlic1xcZGYtbGF5b3V0c1xcc3JjXFxsaWJcXGZ1bGwtbGF5b3V0XFxmdWxsLWxheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHVCQUF1QixFQUFBOztBQUczQjtFQUNJLFlBQVksRUFBQTs7QUFHaEI7RUFDSSx1QkFBdUIsRUFBQSIsImZpbGUiOiJsaWJzL2RmLWxheW91dHMvc3JjL2xpYi9mdWxsLWxheW91dC9mdWxsLWxheW91dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcm90ZWN0aXZlLW1hcmtpbmcge1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wcm90ZWN0aXZlLW1hcmtpbmctcm93IHtcclxuICAgIGhlaWdodDogMjBweDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbiB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.ts":
/*!********************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/full-layout/full-layout.component.ts ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var router_1 = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var full_layout_service_1 = __webpack_require__(/*! ./full-layout.service */ "../../libs/df-layouts/src/lib/full-layout/full-layout.service.ts");
var web_1 = __webpack_require__(/*! @angular-mdc/web */ "../../node_modules/@angular-mdc/web/esm5/web.es5.js");
var SMALL_WIDTH_BREAKPOINT = 1240;
var FullLayoutComponent = /** @class */ (function () {
    function FullLayoutComponent(router, ngZone, service) {
        this.router = router;
        this.ngZone = ngZone;
        this.service = service;
        this._destroy = new rxjs_1.Subject();
    }
    Object.defineProperty(FullLayoutComponent.prototype, "drawerStyle", {
        get: function () {
            return this.service.drawerStyle || 'modal';
        },
        enumerable: true,
        configurable: true
    });
    FullLayoutComponent.prototype.isScreenSmall = function () {
        return this.matcher.matches;
    };
    Object.defineProperty(FullLayoutComponent.prototype, "version", {
        get: function () {
            return this.service.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutComponent.prototype, "title", {
        get: function () {
            return this.service.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutComponent.prototype, "profile", {
        get: function () {
            return this._profile;
        },
        enumerable: true,
        configurable: true
    });
    FullLayoutComponent.prototype.drawOpenToggleClicked = function (appdrawerOpen) {
        this.service.setDrawState(appdrawerOpen);
    };
    FullLayoutComponent.prototype.handleOpened = function ($event) {
        this.service.setDrawState(true);
    };
    FullLayoutComponent.prototype.handleClosed = function ($event) {
        this.service.setDrawState(false);
    };
    FullLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.matcher = matchMedia("(max-width: " + SMALL_WIDTH_BREAKPOINT + "px)");
        this.matcher.addListener(function (event) {
            return _this.ngZone.run(function () { return event.matches; });
        });
        this.router.events
            .pipe(operators_1.takeUntil(this._destroy), operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (_) { });
        this.service.profile.subscribe(function (p) {
            _this._profile = p;
        });
        this.drawOpenSubscription$ = this.service.drawOpen$.subscribe(function (p) { return (_this.drawOpen = p); });
        this.sidebarItems$ = this.service.sidebarItems$;
        this.notification$ = this.service.notification$.pipe(operators_1.concatMap(function (result) {
            return result ? rxjs_1.of(result.message) : rxjs_1.of(null).pipe(operators_1.delay(2750));
        }), 
        // tslint:disable-next-line:no-console
        operators_1.tap(function (result) { return console.log(result); }));
        this.protectiveMarking$ = this.service.protectiveMarking$;
        this.open$ = this.service.open$;
    };
    FullLayoutComponent.prototype.ngOnDestroy = function () {
        this._destroy.next();
        this._destroy.complete();
        this.drawOpenSubscription$.unsubscribe();
    };
    tslib_1.__decorate([
        core_1.ViewChild('topAppBar'),
        tslib_1.__metadata("design:type", web_1.MdcTopAppBar)
    ], FullLayoutComponent.prototype, "topAppBar", void 0);
    FullLayoutComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-full-layout',
            template: __webpack_require__(/*! ./full-layout.component.html */ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.html"),
            styles: [__webpack_require__(/*! ./full-layout.component.scss */ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            core_1.NgZone,
            full_layout_service_1.FullLayoutService])
    ], FullLayoutComponent);
    return FullLayoutComponent;
}());
exports.FullLayoutComponent = FullLayoutComponent;


/***/ }),

/***/ "../../libs/df-layouts/src/lib/full-layout/full-layout.service.ts":
/*!******************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/full-layout/full-layout.service.ts ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var FullLayoutService = /** @class */ (function () {
    function FullLayoutService() {
    }
    Object.defineProperty(FullLayoutService.prototype, "drawerStyle", {
        get: function () {
            return 'modal';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutService.prototype, "version", {
        get: function () {
            return '0.0.0.0';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutService.prototype, "title", {
        get: function () {
            return 'New Application';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutService.prototype, "profile", {
        get: function () {
            return rxjs_1.of({
                name: 'Guest',
                background: 'red',
                displayType: 'circle',
                size: 35
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutService.prototype, "drawOpen$", {
        get: function () {
            return rxjs_1.of(true);
        },
        enumerable: true,
        configurable: true
    });
    FullLayoutService.prototype.setDrawState = function (appdrawerOpen) {
        throw new Error('Method not implemented.');
    };
    Object.defineProperty(FullLayoutService.prototype, "sidebarItems$", {
        get: function () {
            return rxjs_1.of([]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutService.prototype, "notification$", {
        get: function () { return rxjs_1.of(null); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutService.prototype, "open$", {
        get: function () { return rxjs_1.of(null); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullLayoutService.prototype, "protectiveMarking$", {
        get: function () { return rxjs_1.of(null); },
        enumerable: true,
        configurable: true
    });
    FullLayoutService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FullLayoutService);
    return FullLayoutService;
}());
exports.FullLayoutService = FullLayoutService;


/***/ }),

/***/ "../../libs/df-layouts/src/lib/simple-layout/simple-layout.component.ts":
/*!************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/simple-layout/simple-layout.component.ts ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var SimpleLayoutComponent = /** @class */ (function () {
    function SimpleLayoutComponent() {
    }
    SimpleLayoutComponent.prototype.ngOnInit = function () {
    };
    SimpleLayoutComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-simple-layout',
            template: '<router-outlet></router-outlet>',
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SimpleLayoutComponent);
    return SimpleLayoutComponent;
}());
exports.SimpleLayoutComponent = SimpleLayoutComponent;


/***/ }),

/***/ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.html":
/*!************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/title-layout/title-layout.component.html ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mdc-top-app-bar class=\"app-top-app-bar\" #topAppBar fixed prominent=\"false\">\r\n  <mdc-top-app-bar-row>\r\n    <mdc-top-app-bar-section align=\"start\" title=\"{{ title }}\">\r\n      <a *ngIf=\"(logo$ | async) as logo\" [href]=\"logo.url\" [title]=\"logo.title\">\r\n        <img [src]=\"logo.image\" alt=\"\"\r\n      /></a>\r\n\r\n      <mdc-icon *ngIf=\"!(logo$ | async)\" mdcTopAppBarActionItem [routerLink]=\"['/']\">home</mdc-icon>\r\n    </mdc-top-app-bar-section>\r\n    <mdc-top-app-bar-section align=\"center\" class=\"protective-marking\">\r\n      <span>{{ protectiveMarking$ | async | uppercase }}</span>\r\n    </mdc-top-app-bar-section>\r\n    <mdc-top-app-bar-section align=\"end\">\r\n      <mdc-icon\r\n        *ngIf=\"(sidebarItems$ | async)?.length > 0\"\r\n        mdcTopAppBarActionItem\r\n        (click)=\"profileMenu.open = !profileMenu.open\"\r\n        >apps</mdc-icon\r\n      >\r\n\r\n      <digital-first-avatar\r\n        [name]=\"profile?.name\"\r\n        [email]=\"profile?.email\"\r\n        [displayType]=\"profile?.displayType\"\r\n        [size]=\"profile?.size\"\r\n        [background]=\"profile?.background\"\r\n      >\r\n      </digital-first-avatar>\r\n\r\n      <div mdcMenuSurfaceAnchor #menuAnchor>\r\n        <mdc-menu #profileMenu [anchorElement]=\"menuAnchor\">\r\n          <div class=\"nav-list wrap\">\r\n            <div *ngFor=\"let item of (appItems$ | async)\" class=\"nav-button\">\r\n              <a *ngIf=\"item.url\" [href]=\"item.url\" class=\"nav-button-anchor\" target=\"item.target\">\r\n                <span class=\"nav-button-icon material-icons\">{{\r\n                  item.icon\r\n                }}</span>\r\n                <div class=\"nav-button-text\">{{ item.caption }}</div>\r\n              </a>\r\n            </div>\r\n          </div>\r\n\r\n          <mdc-list>\r\n            <a\r\n              *ngFor=\"let item of (sidebarItems$ | async)\"\r\n              mdc-list-item\r\n              [routerLink]=\"item.routerLink\"\r\n            >\r\n              {{ item.caption }}\r\n            </a>\r\n          </mdc-list>\r\n\r\n          <div class=\"app-version\">Version {{ version }} {{bookType$ | async}}</div>\r\n        </mdc-menu>\r\n      </div>\r\n    </mdc-top-app-bar-section>\r\n  </mdc-top-app-bar-row>\r\n</mdc-top-app-bar>\r\n\r\n<div mdcTopAppBarFixedAdjust>\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.scss":
/*!************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/title-layout/title-layout.component.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mdc-top-app-bar__section {\n  width: 33%; }\n\n.protective-marking {\n  justify-content: center; }\n\n.protective-marking-row {\n  height: 20px; }\n\n.notification {\n  justify-content: center; }\n\n.mdc-menu {\n  width: 250px; }\n\n.app-version {\n  padding: 4px 16px;\n  font-size: 12px; }\n\n.nav-list {\n  padding: 4px;\n  margin: 0;\n  display: flex;\n  flex-direction: row;\n  align-items: center; }\n\n.nav-list .nav-button {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    width: 80px;\n    height: 100%;\n    color: #687381;\n    font-size: 12px;\n    font-weight: 500;\n    text-decoration: none;\n    transition: all linear 0.05s;\n    -webkit-transition: all linear 0.05s;\n    -moz-transition: all linear 0.05s; }\n\n.nav-list .nav-button-anchor {\n    color: #424242;\n    text-decoration: none; }\n\n.nav-list .nav-button-icon {\n    padding: 8px;\n    font-size: 48px; }\n\n.nav-list .nav-button-text {\n    width: 100%;\n    text-align: center; }\n\n.nowrap {\n  flex-wrap: nowrap; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtbGF5b3V0cy9zcmMvbGliL3RpdGxlLWxheW91dC9DOlxcVXNlcnNcXGFqa2l0c29uXFxyZXBvc1xcREYtQ2xpZW50XFxkaWdpdGFsLWZpcnN0L2xpYnNcXGRmLWxheW91dHNcXHNyY1xcbGliXFx0aXRsZS1sYXlvdXRcXHRpdGxlLWxheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVUsRUFBQTs7QUFHWjtFQUNFLHVCQUF1QixFQUFBOztBQUd6QjtFQUNFLFlBQVksRUFBQTs7QUFHZDtFQUNFLHVCQUF1QixFQUFBOztBQUd6QjtFQUNFLFlBQVksRUFBQTs7QUFHZDtFQUNFLGlCQUFpQjtFQUNqQixlQUFlLEVBQUE7O0FBR2pCO0VBQ0UsWUFBWTtFQUNaLFNBQVM7RUFDVCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQixFQUFBOztBQUxyQjtJQVNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQXlCO0lBQ3pCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIscUJBQXFCO0lBQ3JCLDRCQUE0QjtJQUM1QixvQ0FBb0M7SUFDcEMsaUNBQWlDLEVBQUE7O0FBckJyQztJQXlCSSxjQUFzQjtJQUMxQixxQkFBcUIsRUFBQTs7QUExQnJCO0lBOEJJLFlBQVk7SUFDWixlQUFlLEVBQUE7O0FBL0JuQjtJQW1DSSxXQUFXO0lBQ1gsa0JBQWtCLEVBQUE7O0FBTXRCO0VBRUUsaUJBQWlCLEVBQUE7O0FBR25CO0VBRUUsZUFBZSxFQUFBIiwiZmlsZSI6ImxpYnMvZGYtbGF5b3V0cy9zcmMvbGliL3RpdGxlLWxheW91dC90aXRsZS1sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWRjLXRvcC1hcHAtYmFyX19zZWN0aW9uIHtcclxuICB3aWR0aDogMzMlO1xyXG59XHJcblxyXG4ucHJvdGVjdGl2ZS1tYXJraW5nIHtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnByb3RlY3RpdmUtbWFya2luZy1yb3cge1xyXG4gIGhlaWdodDogMjBweDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbiB7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5tZGMtbWVudSB7XHJcbiAgd2lkdGg6IDI1MHB4O1xyXG59XHJcblxyXG4uYXBwLXZlcnNpb24ge1xyXG4gIHBhZGRpbmc6IDRweCAxNnB4O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLm5hdi1saXN0IHtcclxuICBwYWRkaW5nOiA0cHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuXHJcbiAgLm5hdi1idXR0b257XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHdpZHRoOiA4MHB4O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgY29sb3I6IHJnYigxMDQsIDExNSwgMTI5KTtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgbGluZWFyIDAuMDVzO1xyXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgbGluZWFyIDAuMDVzO1xyXG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgbGluZWFyIDAuMDVzO1xyXG4gIH1cclxuXHJcbiAgLm5hdi1idXR0b24tYW5jaG9yIHtcclxuICAgIGNvbG9yOiByZ2IoNjYsIDY2LCA2Nik7XHJcbnRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICB9XHJcblxyXG4gIC5uYXYtYnV0dG9uLWljb24ge1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgZm9udC1zaXplOiA0OHB4O1xyXG4gIH1cclxuXHJcbiAgLm5hdi1idXR0b24tdGV4dCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuLm5vd3JhcCB7XHJcbiAgLXdlYmtpdC1mbGV4LXdyYXA6IG5vd3JhcDtcclxuICBmbGV4LXdyYXA6IG5vd3JhcDtcclxufVxyXG5cclxuLndyYXAge1xyXG4gIC13ZWJraXQtZmxleC13cmFwOiB3cmFwO1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.ts":
/*!**********************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/title-layout/title-layout.component.ts ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var router_1 = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var title_layout_service_1 = __webpack_require__(/*! ./title-layout.service */ "../../libs/df-layouts/src/lib/title-layout/title-layout.service.ts");
var web_1 = __webpack_require__(/*! @angular-mdc/web */ "../../node_modules/@angular-mdc/web/esm5/web.es5.js");
var TitleLayoutComponent = /** @class */ (function () {
    function TitleLayoutComponent(router, ngZone, service) {
        this.router = router;
        this.ngZone = ngZone;
        this.service = service;
        this._destroy = new rxjs_1.Subject();
    }
    Object.defineProperty(TitleLayoutComponent.prototype, "version", {
        get: function () {
            return this.service.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutComponent.prototype, "title", {
        get: function () {
            return this.service.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutComponent.prototype, "profile", {
        get: function () {
            return this._profile;
        },
        enumerable: true,
        configurable: true
    });
    TitleLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .pipe(operators_1.takeUntil(this._destroy), operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (_) { });
        this.service.profile.subscribe(function (p) {
            _this._profile = p;
        });
        this.logo$ = this.service.logo$;
        this.bookType$ = this.service.bookType$;
        this.sidebarItems$ = this.service.sidebarItems$;
        this.appItems$ = this.service.appItems$;
        this.notification$ = this.service.notification$.pipe(operators_1.concatMap(function (result) {
            return result ? rxjs_1.of(result.message) : rxjs_1.of(null).pipe(operators_1.delay(2750));
        }), 
        // tslint:disable-next-line:no-console
        operators_1.tap(function (result) { return console.log(result); }));
        this.protectiveMarking$ = this.service.protectiveMarking$;
    };
    TitleLayoutComponent.prototype.ngOnDestroy = function () {
        this._destroy.next();
        this._destroy.complete();
    };
    tslib_1.__decorate([
        core_1.ViewChild('topAppBar'),
        tslib_1.__metadata("design:type", web_1.MdcTopAppBar)
    ], TitleLayoutComponent.prototype, "topAppBar", void 0);
    TitleLayoutComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-title-layout',
            template: __webpack_require__(/*! ./title-layout.component.html */ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.html"),
            styles: [__webpack_require__(/*! ./title-layout.component.scss */ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            core_1.NgZone,
            title_layout_service_1.TitleLayoutService])
    ], TitleLayoutComponent);
    return TitleLayoutComponent;
}());
exports.TitleLayoutComponent = TitleLayoutComponent;


/***/ }),

/***/ "../../libs/df-layouts/src/lib/title-layout/title-layout.service.ts":
/*!********************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-layouts/src/lib/title-layout/title-layout.service.ts ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var TitleLayoutService = /** @class */ (function () {
    function TitleLayoutService() {
    }
    Object.defineProperty(TitleLayoutService.prototype, "version", {
        get: function () {
            return '0.0.0.0';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutService.prototype, "title", {
        get: function () {
            return 'New Application';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutService.prototype, "profile", {
        get: function () {
            return rxjs_1.of({
                name: 'Guest',
                background: 'red',
                displayType: 'circle',
                size: 35
            });
        },
        enumerable: true,
        configurable: true
    });
    TitleLayoutService.prototype.setDrawState = function (appdrawerOpen) {
        throw new Error('Method not implemented.');
    };
    Object.defineProperty(TitleLayoutService.prototype, "bookType$", {
        get: function () {
            return rxjs_1.of('');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutService.prototype, "appItems$", {
        get: function () {
            return rxjs_1.of([]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutService.prototype, "sidebarItems$", {
        get: function () {
            return rxjs_1.of([]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutService.prototype, "notification$", {
        get: function () { return rxjs_1.of(null); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutService.prototype, "protectiveMarking$", {
        get: function () { return rxjs_1.of(null); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleLayoutService.prototype, "logo$", {
        get: function () {
            return rxjs_1.of({
                'image': 'assets/crest.png',
                'url': '/',
                'title': 'configure me'
            });
        },
        enumerable: true,
        configurable: true
    });
    TitleLayoutService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], TitleLayoutService);
    return TitleLayoutService;
}());
exports.TitleLayoutService = TitleLayoutService;


/***/ }),

/***/ "../../libs/df-pages/src/index.ts":
/*!**********************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pages/src/index.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var error_page_not_found_component_1 = __webpack_require__(/*! ./lib/error-page-not-found/error-page-not-found.component */ "../../libs/df-pages/src/lib/error-page-not-found/error-page-not-found.component.ts");
exports.ErrorPageNotFoundComponent = error_page_not_found_component_1.ErrorPageNotFoundComponent;
var error_server_component_1 = __webpack_require__(/*! ./lib/error-server/error-server.component */ "../../libs/df-pages/src/lib/error-server/error-server.component.ts");
exports.ErrorServerComponent = error_server_component_1.ErrorServerComponent;
tslib_1.__exportStar(__webpack_require__(/*! ./lib/df-pages.module */ "../../libs/df-pages/src/lib/df-pages.module.ts"), exports);


/***/ }),

/***/ "../../libs/df-pages/src/lib/df-pages.module.ts":
/*!************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pages/src/lib/df-pages.module.ts ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
var df_theme_1 = __webpack_require__(/*! @digital-first/df-theme */ "../../libs/df-theme/src/index.ts");
var error_page_not_found_component_1 = __webpack_require__(/*! ./error-page-not-found/error-page-not-found.component */ "../../libs/df-pages/src/lib/error-page-not-found/error-page-not-found.component.ts");
var error_server_component_1 = __webpack_require__(/*! ./error-server/error-server.component */ "../../libs/df-pages/src/lib/error-server/error-server.component.ts");
var COMPONENTS = [
    error_page_not_found_component_1.ErrorPageNotFoundComponent,
    error_server_component_1.ErrorServerComponent,
];
var DfPagesModule = /** @class */ (function () {
    function DfPagesModule() {
    }
    DfPagesModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                df_theme_1.DfThemeModule
            ],
            declarations: COMPONENTS.slice(),
            exports: COMPONENTS.slice(),
        })
    ], DfPagesModule);
    return DfPagesModule;
}());
exports.DfPagesModule = DfPagesModule;


/***/ }),

/***/ "../../libs/df-pages/src/lib/error-page-not-found/error-page-not-found.component.ts":
/*!************************************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pages/src/lib/error-page-not-found/error-page-not-found.component.ts ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var ErrorPageNotFoundComponent = /** @class */ (function () {
    function ErrorPageNotFoundComponent() {
    }
    ErrorPageNotFoundComponent.prototype.ngOnInit = function () { };
    ErrorPageNotFoundComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-error-page-not-found',
            template: "\n    <div class=\"app-announcement-wall digital-first-error-page-not-found\">\n      <div class=\"app-announcement-container\">\n        <h1>\n          Sorry, we couldn't find the page you were looking for.\n        </h1>\n      </div>\n    </div>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ErrorPageNotFoundComponent);
    return ErrorPageNotFoundComponent;
}());
exports.ErrorPageNotFoundComponent = ErrorPageNotFoundComponent;


/***/ }),

/***/ "../../libs/df-pages/src/lib/error-server/error-server.component.ts":
/*!********************************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pages/src/lib/error-server/error-server.component.ts ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var ErrorServerComponent = /** @class */ (function () {
    function ErrorServerComponent() {
    }
    ErrorServerComponent.prototype.ngOnInit = function () { };
    ErrorServerComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-error-server',
            template: "\n    <div class=\"app-announcement-wall digital-first-error-server\">\n      <div class=\"app-announcement-container\">\n        <h1>oh no...</h1>\n        <h3>We have had an error</h3>\n        <h4>Error 500</h4>\n        <p>Sorry...please try again.</p>\n      </div>\n    </div>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ErrorServerComponent);
    return ErrorServerComponent;
}());
exports.ErrorServerComponent = ErrorServerComponent;


/***/ }),

/***/ "../../libs/df-pipes/src/index.ts":
/*!**********************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pipes/src/index.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/df-pipes.module */ "../../libs/df-pipes/src/lib/df-pipes.module.ts"), exports);


/***/ }),

/***/ "../../libs/df-pipes/src/lib/df-pipes.module.ts":
/*!************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pipes/src/lib/df-pipes.module.ts ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
var split_case_pipe_1 = __webpack_require__(/*! ./split-case.pipe */ "../../libs/df-pipes/src/lib/split-case.pipe.ts");
var safe_html_pipe_1 = __webpack_require__(/*! ./safe-html.pipe */ "../../libs/df-pipes/src/lib/safe-html.pipe.ts");
var nice_name_pipe_1 = __webpack_require__(/*! ./nice-name.pipe */ "../../libs/df-pipes/src/lib/nice-name.pipe.ts");
var truncate_pipe_1 = __webpack_require__(/*! ./truncate.pipe */ "../../libs/df-pipes/src/lib/truncate.pipe.ts");
var PIPES = [
    split_case_pipe_1.SplitCasePipe,
    safe_html_pipe_1.SafeHtmlPipe,
    nice_name_pipe_1.NiceNamePipe,
    truncate_pipe_1.TruncatePipe
];
var DfPipesModule = /** @class */ (function () {
    function DfPipesModule() {
    }
    DfPipesModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: PIPES.slice(),
            exports: PIPES.slice()
        })
    ], DfPipesModule);
    return DfPipesModule;
}());
exports.DfPipesModule = DfPipesModule;


/***/ }),

/***/ "../../libs/df-pipes/src/lib/nice-name.pipe.ts":
/*!***********************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pipes/src/lib/nice-name.pipe.ts ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var NiceNamePipe = /** @class */ (function () {
    function NiceNamePipe() {
    }
    NiceNamePipe.prototype.transform = function (value, args) {
        var first = 'Jon';
        var last = 'Doe';
        if (value) {
            var split = value.replace(' ', '').split(',');
            first = split[1];
            last = split[0];
        }
        return first + " " + last;
    };
    NiceNamePipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'niceName'
        })
    ], NiceNamePipe);
    return NiceNamePipe;
}());
exports.NiceNamePipe = NiceNamePipe;


/***/ }),

/***/ "../../libs/df-pipes/src/lib/safe-html.pipe.ts":
/*!***********************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pipes/src/lib/safe-html.pipe.ts ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var SafeHtmlPipe = /** @class */ (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        if (value) {
            return this.sanitized.bypassSecurityTrustHtml(value);
        }
    };
    SafeHtmlPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'safeHtml'
        }),
        tslib_1.__metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());
exports.SafeHtmlPipe = SafeHtmlPipe;


/***/ }),

/***/ "../../libs/df-pipes/src/lib/split-case.pipe.ts":
/*!************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pipes/src/lib/split-case.pipe.ts ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var SplitCasePipe = /** @class */ (function () {
    function SplitCasePipe() {
    }
    SplitCasePipe.prototype.transform = function (value, args) {
        if (typeof value !== 'string') {
            return value;
        }
        return value.split(/(?=[A-Z])/).join(' ');
    };
    SplitCasePipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'splitCase'
        })
    ], SplitCasePipe);
    return SplitCasePipe;
}());
exports.SplitCasePipe = SplitCasePipe;


/***/ }),

/***/ "../../libs/df-pipes/src/lib/truncate.pipe.ts":
/*!**********************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-pipes/src/lib/truncate.pipe.ts ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var TruncatePipe = /** @class */ (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, args) {
        var limit = args && args.length > 0 ? parseInt(args[0], 10) : 20;
        var trail = args && args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    TruncatePipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'truncate'
        })
    ], TruncatePipe);
    return TruncatePipe;
}());
exports.TruncatePipe = TruncatePipe;


/***/ }),

/***/ "../../libs/df-theme/src/index.ts":
/*!**********************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-theme/src/index.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/df-theme.module */ "../../libs/df-theme/src/lib/df-theme.module.ts"), exports);


/***/ }),

/***/ "../../libs/df-theme/src/lib/df-theme.module.ts":
/*!************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/libs/df-theme/src/lib/df-theme.module.ts ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
var web_1 = __webpack_require__(/*! @angular-mdc/web */ "../../node_modules/@angular-mdc/web/esm5/web.es5.js");
var MATERIAL_COMPONENTS = [
    web_1.MdcButtonModule,
    web_1.MdcCardModule,
    web_1.MdcChipsModule,
    web_1.MdcCheckboxModule,
    web_1.MdcDialogModule,
    web_1.MdcDrawerModule,
    web_1.MdcElevationModule,
    web_1.MdcFabModule,
    web_1.MdcFormFieldModule,
    web_1.MdcIconModule,
    web_1.MdcIconButtonModule,
    web_1.MdcImageListModule,
    web_1.MdcLinearProgressModule,
    web_1.MdcListModule,
    web_1.MdcMenuModule,
    web_1.MdcRadioModule,
    web_1.MdcRippleModule,
    web_1.MdcSelectModule,
    web_1.MdcSliderModule,
    web_1.MdcSnackbarModule,
    web_1.MdcSwitchModule,
    web_1.MdcTabBarModule,
    web_1.MdcTextFieldModule,
    web_1.MdcTopAppBarModule,
    web_1.MdcTypographyModule
];
var DfThemeModule = /** @class */ (function () {
    function DfThemeModule() {
    }
    DfThemeModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ].concat(MATERIAL_COMPONENTS),
            exports: MATERIAL_COMPONENTS.slice()
        })
    ], DfThemeModule);
    return DfThemeModule;
}());
exports.DfThemeModule = DfThemeModule;


/***/ }),

/***/ "../../node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!************************************************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/node_modules/moment/locale sync ^\.\/.*$ ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../node_modules/moment/locale/af.js",
	"./af.js": "../../node_modules/moment/locale/af.js",
	"./ar": "../../node_modules/moment/locale/ar.js",
	"./ar-dz": "../../node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "../../node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "../../node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "../../node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "../../node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "../../node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "../../node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "../../node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "../../node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "../../node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "../../node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "../../node_modules/moment/locale/ar-tn.js",
	"./ar.js": "../../node_modules/moment/locale/ar.js",
	"./az": "../../node_modules/moment/locale/az.js",
	"./az.js": "../../node_modules/moment/locale/az.js",
	"./be": "../../node_modules/moment/locale/be.js",
	"./be.js": "../../node_modules/moment/locale/be.js",
	"./bg": "../../node_modules/moment/locale/bg.js",
	"./bg.js": "../../node_modules/moment/locale/bg.js",
	"./bm": "../../node_modules/moment/locale/bm.js",
	"./bm.js": "../../node_modules/moment/locale/bm.js",
	"./bn": "../../node_modules/moment/locale/bn.js",
	"./bn.js": "../../node_modules/moment/locale/bn.js",
	"./bo": "../../node_modules/moment/locale/bo.js",
	"./bo.js": "../../node_modules/moment/locale/bo.js",
	"./br": "../../node_modules/moment/locale/br.js",
	"./br.js": "../../node_modules/moment/locale/br.js",
	"./bs": "../../node_modules/moment/locale/bs.js",
	"./bs.js": "../../node_modules/moment/locale/bs.js",
	"./ca": "../../node_modules/moment/locale/ca.js",
	"./ca.js": "../../node_modules/moment/locale/ca.js",
	"./cs": "../../node_modules/moment/locale/cs.js",
	"./cs.js": "../../node_modules/moment/locale/cs.js",
	"./cv": "../../node_modules/moment/locale/cv.js",
	"./cv.js": "../../node_modules/moment/locale/cv.js",
	"./cy": "../../node_modules/moment/locale/cy.js",
	"./cy.js": "../../node_modules/moment/locale/cy.js",
	"./da": "../../node_modules/moment/locale/da.js",
	"./da.js": "../../node_modules/moment/locale/da.js",
	"./de": "../../node_modules/moment/locale/de.js",
	"./de-at": "../../node_modules/moment/locale/de-at.js",
	"./de-at.js": "../../node_modules/moment/locale/de-at.js",
	"./de-ch": "../../node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "../../node_modules/moment/locale/de-ch.js",
	"./de.js": "../../node_modules/moment/locale/de.js",
	"./dv": "../../node_modules/moment/locale/dv.js",
	"./dv.js": "../../node_modules/moment/locale/dv.js",
	"./el": "../../node_modules/moment/locale/el.js",
	"./el.js": "../../node_modules/moment/locale/el.js",
	"./en-SG": "../../node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "../../node_modules/moment/locale/en-SG.js",
	"./en-au": "../../node_modules/moment/locale/en-au.js",
	"./en-au.js": "../../node_modules/moment/locale/en-au.js",
	"./en-ca": "../../node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "../../node_modules/moment/locale/en-ca.js",
	"./en-gb": "../../node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "../../node_modules/moment/locale/en-gb.js",
	"./en-ie": "../../node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "../../node_modules/moment/locale/en-ie.js",
	"./en-il": "../../node_modules/moment/locale/en-il.js",
	"./en-il.js": "../../node_modules/moment/locale/en-il.js",
	"./en-nz": "../../node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "../../node_modules/moment/locale/en-nz.js",
	"./eo": "../../node_modules/moment/locale/eo.js",
	"./eo.js": "../../node_modules/moment/locale/eo.js",
	"./es": "../../node_modules/moment/locale/es.js",
	"./es-do": "../../node_modules/moment/locale/es-do.js",
	"./es-do.js": "../../node_modules/moment/locale/es-do.js",
	"./es-us": "../../node_modules/moment/locale/es-us.js",
	"./es-us.js": "../../node_modules/moment/locale/es-us.js",
	"./es.js": "../../node_modules/moment/locale/es.js",
	"./et": "../../node_modules/moment/locale/et.js",
	"./et.js": "../../node_modules/moment/locale/et.js",
	"./eu": "../../node_modules/moment/locale/eu.js",
	"./eu.js": "../../node_modules/moment/locale/eu.js",
	"./fa": "../../node_modules/moment/locale/fa.js",
	"./fa.js": "../../node_modules/moment/locale/fa.js",
	"./fi": "../../node_modules/moment/locale/fi.js",
	"./fi.js": "../../node_modules/moment/locale/fi.js",
	"./fo": "../../node_modules/moment/locale/fo.js",
	"./fo.js": "../../node_modules/moment/locale/fo.js",
	"./fr": "../../node_modules/moment/locale/fr.js",
	"./fr-ca": "../../node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "../../node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "../../node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "../../node_modules/moment/locale/fr-ch.js",
	"./fr.js": "../../node_modules/moment/locale/fr.js",
	"./fy": "../../node_modules/moment/locale/fy.js",
	"./fy.js": "../../node_modules/moment/locale/fy.js",
	"./ga": "../../node_modules/moment/locale/ga.js",
	"./ga.js": "../../node_modules/moment/locale/ga.js",
	"./gd": "../../node_modules/moment/locale/gd.js",
	"./gd.js": "../../node_modules/moment/locale/gd.js",
	"./gl": "../../node_modules/moment/locale/gl.js",
	"./gl.js": "../../node_modules/moment/locale/gl.js",
	"./gom-latn": "../../node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "../../node_modules/moment/locale/gom-latn.js",
	"./gu": "../../node_modules/moment/locale/gu.js",
	"./gu.js": "../../node_modules/moment/locale/gu.js",
	"./he": "../../node_modules/moment/locale/he.js",
	"./he.js": "../../node_modules/moment/locale/he.js",
	"./hi": "../../node_modules/moment/locale/hi.js",
	"./hi.js": "../../node_modules/moment/locale/hi.js",
	"./hr": "../../node_modules/moment/locale/hr.js",
	"./hr.js": "../../node_modules/moment/locale/hr.js",
	"./hu": "../../node_modules/moment/locale/hu.js",
	"./hu.js": "../../node_modules/moment/locale/hu.js",
	"./hy-am": "../../node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "../../node_modules/moment/locale/hy-am.js",
	"./id": "../../node_modules/moment/locale/id.js",
	"./id.js": "../../node_modules/moment/locale/id.js",
	"./is": "../../node_modules/moment/locale/is.js",
	"./is.js": "../../node_modules/moment/locale/is.js",
	"./it": "../../node_modules/moment/locale/it.js",
	"./it-ch": "../../node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "../../node_modules/moment/locale/it-ch.js",
	"./it.js": "../../node_modules/moment/locale/it.js",
	"./ja": "../../node_modules/moment/locale/ja.js",
	"./ja.js": "../../node_modules/moment/locale/ja.js",
	"./jv": "../../node_modules/moment/locale/jv.js",
	"./jv.js": "../../node_modules/moment/locale/jv.js",
	"./ka": "../../node_modules/moment/locale/ka.js",
	"./ka.js": "../../node_modules/moment/locale/ka.js",
	"./kk": "../../node_modules/moment/locale/kk.js",
	"./kk.js": "../../node_modules/moment/locale/kk.js",
	"./km": "../../node_modules/moment/locale/km.js",
	"./km.js": "../../node_modules/moment/locale/km.js",
	"./kn": "../../node_modules/moment/locale/kn.js",
	"./kn.js": "../../node_modules/moment/locale/kn.js",
	"./ko": "../../node_modules/moment/locale/ko.js",
	"./ko.js": "../../node_modules/moment/locale/ko.js",
	"./ku": "../../node_modules/moment/locale/ku.js",
	"./ku.js": "../../node_modules/moment/locale/ku.js",
	"./ky": "../../node_modules/moment/locale/ky.js",
	"./ky.js": "../../node_modules/moment/locale/ky.js",
	"./lb": "../../node_modules/moment/locale/lb.js",
	"./lb.js": "../../node_modules/moment/locale/lb.js",
	"./lo": "../../node_modules/moment/locale/lo.js",
	"./lo.js": "../../node_modules/moment/locale/lo.js",
	"./lt": "../../node_modules/moment/locale/lt.js",
	"./lt.js": "../../node_modules/moment/locale/lt.js",
	"./lv": "../../node_modules/moment/locale/lv.js",
	"./lv.js": "../../node_modules/moment/locale/lv.js",
	"./me": "../../node_modules/moment/locale/me.js",
	"./me.js": "../../node_modules/moment/locale/me.js",
	"./mi": "../../node_modules/moment/locale/mi.js",
	"./mi.js": "../../node_modules/moment/locale/mi.js",
	"./mk": "../../node_modules/moment/locale/mk.js",
	"./mk.js": "../../node_modules/moment/locale/mk.js",
	"./ml": "../../node_modules/moment/locale/ml.js",
	"./ml.js": "../../node_modules/moment/locale/ml.js",
	"./mn": "../../node_modules/moment/locale/mn.js",
	"./mn.js": "../../node_modules/moment/locale/mn.js",
	"./mr": "../../node_modules/moment/locale/mr.js",
	"./mr.js": "../../node_modules/moment/locale/mr.js",
	"./ms": "../../node_modules/moment/locale/ms.js",
	"./ms-my": "../../node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "../../node_modules/moment/locale/ms-my.js",
	"./ms.js": "../../node_modules/moment/locale/ms.js",
	"./mt": "../../node_modules/moment/locale/mt.js",
	"./mt.js": "../../node_modules/moment/locale/mt.js",
	"./my": "../../node_modules/moment/locale/my.js",
	"./my.js": "../../node_modules/moment/locale/my.js",
	"./nb": "../../node_modules/moment/locale/nb.js",
	"./nb.js": "../../node_modules/moment/locale/nb.js",
	"./ne": "../../node_modules/moment/locale/ne.js",
	"./ne.js": "../../node_modules/moment/locale/ne.js",
	"./nl": "../../node_modules/moment/locale/nl.js",
	"./nl-be": "../../node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "../../node_modules/moment/locale/nl-be.js",
	"./nl.js": "../../node_modules/moment/locale/nl.js",
	"./nn": "../../node_modules/moment/locale/nn.js",
	"./nn.js": "../../node_modules/moment/locale/nn.js",
	"./pa-in": "../../node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "../../node_modules/moment/locale/pa-in.js",
	"./pl": "../../node_modules/moment/locale/pl.js",
	"./pl.js": "../../node_modules/moment/locale/pl.js",
	"./pt": "../../node_modules/moment/locale/pt.js",
	"./pt-br": "../../node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "../../node_modules/moment/locale/pt-br.js",
	"./pt.js": "../../node_modules/moment/locale/pt.js",
	"./ro": "../../node_modules/moment/locale/ro.js",
	"./ro.js": "../../node_modules/moment/locale/ro.js",
	"./ru": "../../node_modules/moment/locale/ru.js",
	"./ru.js": "../../node_modules/moment/locale/ru.js",
	"./sd": "../../node_modules/moment/locale/sd.js",
	"./sd.js": "../../node_modules/moment/locale/sd.js",
	"./se": "../../node_modules/moment/locale/se.js",
	"./se.js": "../../node_modules/moment/locale/se.js",
	"./si": "../../node_modules/moment/locale/si.js",
	"./si.js": "../../node_modules/moment/locale/si.js",
	"./sk": "../../node_modules/moment/locale/sk.js",
	"./sk.js": "../../node_modules/moment/locale/sk.js",
	"./sl": "../../node_modules/moment/locale/sl.js",
	"./sl.js": "../../node_modules/moment/locale/sl.js",
	"./sq": "../../node_modules/moment/locale/sq.js",
	"./sq.js": "../../node_modules/moment/locale/sq.js",
	"./sr": "../../node_modules/moment/locale/sr.js",
	"./sr-cyrl": "../../node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "../../node_modules/moment/locale/sr.js",
	"./ss": "../../node_modules/moment/locale/ss.js",
	"./ss.js": "../../node_modules/moment/locale/ss.js",
	"./sv": "../../node_modules/moment/locale/sv.js",
	"./sv.js": "../../node_modules/moment/locale/sv.js",
	"./sw": "../../node_modules/moment/locale/sw.js",
	"./sw.js": "../../node_modules/moment/locale/sw.js",
	"./ta": "../../node_modules/moment/locale/ta.js",
	"./ta.js": "../../node_modules/moment/locale/ta.js",
	"./te": "../../node_modules/moment/locale/te.js",
	"./te.js": "../../node_modules/moment/locale/te.js",
	"./tet": "../../node_modules/moment/locale/tet.js",
	"./tet.js": "../../node_modules/moment/locale/tet.js",
	"./tg": "../../node_modules/moment/locale/tg.js",
	"./tg.js": "../../node_modules/moment/locale/tg.js",
	"./th": "../../node_modules/moment/locale/th.js",
	"./th.js": "../../node_modules/moment/locale/th.js",
	"./tl-ph": "../../node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "../../node_modules/moment/locale/tl-ph.js",
	"./tlh": "../../node_modules/moment/locale/tlh.js",
	"./tlh.js": "../../node_modules/moment/locale/tlh.js",
	"./tr": "../../node_modules/moment/locale/tr.js",
	"./tr.js": "../../node_modules/moment/locale/tr.js",
	"./tzl": "../../node_modules/moment/locale/tzl.js",
	"./tzl.js": "../../node_modules/moment/locale/tzl.js",
	"./tzm": "../../node_modules/moment/locale/tzm.js",
	"./tzm-latn": "../../node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "../../node_modules/moment/locale/tzm.js",
	"./ug-cn": "../../node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "../../node_modules/moment/locale/ug-cn.js",
	"./uk": "../../node_modules/moment/locale/uk.js",
	"./uk.js": "../../node_modules/moment/locale/uk.js",
	"./ur": "../../node_modules/moment/locale/ur.js",
	"./ur.js": "../../node_modules/moment/locale/ur.js",
	"./uz": "../../node_modules/moment/locale/uz.js",
	"./uz-latn": "../../node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "../../node_modules/moment/locale/uz-latn.js",
	"./uz.js": "../../node_modules/moment/locale/uz.js",
	"./vi": "../../node_modules/moment/locale/vi.js",
	"./vi.js": "../../node_modules/moment/locale/vi.js",
	"./x-pseudo": "../../node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../node_modules/moment/locale/x-pseudo.js",
	"./yo": "../../node_modules/moment/locale/yo.js",
	"./yo.js": "../../node_modules/moment/locale/yo.js",
	"./zh-cn": "../../node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "../../node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "../../node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "../../node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "../../node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "../../node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "../../package.json":
/*!********************************************************************!*\
  !*** C:/Users/ajkitson/repos/DF-Client/digital-first/package.json ***!
  \********************************************************************/
/*! exports provided: name, version, commit-hash, license, scripts, private, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"digital-first","version":"0.0.0","commit-hash":"-------","license":"MIT","scripts":{"ng":"ng","start:commitments":"ng serve commitments --ssl --ssl-key ssl/server.key --ssl-cert ssl/server.crt --live-reload true","start:programs-admin":"ng serve programs-admin --ssl --ssl-key ssl/server.key --ssl-cert ssl/server.crt --live-reload true","start:commitments-reader":"ng serve commitments-reader","start:policy-briefs":"ng serve policy-briefs","start:deck":"ng serve deck --ssl --ssl-key ssl/server.key --ssl-cert ssl/server.crt --live-reload true","start:commitments-reader-remote":"ng serve commitments-reader --ssl --ssl-key ssl/server.key --ssl-cert ssl/server.crt --configuration=remote --live-reload true","start:commitments-reader-remote-dev":"ng serve commitments-reader --ssl --ssl-key ssl/server.key --ssl-cert ssl/server.crt --configuration=remotedev --live-reload true","generate-graphql:deck":"gql-gen --config ./apps/deck/codegen.yml","generate-graphql:commitments-reader":"gql-gen --config ./apps/commitments-reader/codegen.yml","generate-graphql:programs-admin":"gql-gen --config ./apps/programs-admin/codegen.yml","generate-graphql:policy-briefs":"gql-gen --config ./apps/policy-briefs/codegen.yml","test:programs-admin":"ng test programs-admin","testwatch:programs-admin":"ng test programs-admin --watch","build":"ng build","build:all":"run-p build:programs-admin sharepoint:build:commitments sharepoint:build:commitments-reader","build:programs-admin":"ng build programs-admin --c9onfiguration=production","build:commitments-reader":"ng build commitments-reader --configuration=production","build:policy-briefs":"ng build policy-briefs --configuration=production","build:deck":"ng build deck --configuration=production","build:commitments-reader-remote":"ng build commitments-reader --configuration=remote","build:commitments-reader-remote-dev":"ng build commitments-reader --configuration=remotedev","test":"ng test","lint":"./node_modules/.bin/nx lint && ng lint","e2e":"ng e2e","affected:apps":"./node_modules/.bin/nx affected:apps","affected:libs":"./node_modules/.bin/nx affected:libs","affected:build":"./node_modules/.bin/nx affected:build","affected:e2e":"./node_modules/.bin/nx affected:e2e","affected:test":"./node_modules/.bin/nx affected:test","affected:lint":"./node_modules/.bin/nx affected:lint","affected:dep-graph":"./node_modules/.bin/nx affected:dep-graph","format":"./node_modules/.bin/nx format:write","format:write":"./node_modules/.bin/nx format:write","format:check":"./node_modules/.bin/nx format:check","update":"ng update @nrwl/schematics","update-npm":"npx npm-check -u","update:check":"ng update","workspace-schematic":"./node_modules/.bin/nx workspace-schematic","dep-graph":"./node_modules/.bin/nx dep-graph","help":"./node_modules/.bin/nx help","deploy:all:policy-briefs":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrls 'http://vm-dev-lbs13/sites/redigb' -AppName 'Policy-Briefs'","deploy:js:policy-briefs":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrls 'http://vm-dev-lbs13/sites/redigb' -AppName 'Policy-Briefs' -jsOnly","deploy:all":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrls 'http://vm-dev-lbs13/sites/commitments' -AppName 'Commitments'","sharepoint:build:commitments":"ng build commitments --configuration=sharepoint","sharepoint:build:commitments-reader":"ng build commitments-reader --configuration=sharepoint","sharepoint:build:policy-briefs":"ng build policy-briefs --configuration=sharepoint","deploy:all:commitments-reader":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrls 'http://vm-dev-lbs13/sites/commitments-reader' -AppName 'Commitments-Reader' -LoadReferenceData True","deploy:js":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrls 'http://vm-dev-lbs13/sites/commitments' -AppName 'Commitments' -jsOnly","deploy:js:commitments-reader":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrls 'http://vm-dev-lbs13/sites/commitments-reader' -AppName 'Commitments-Reader' -jsOnly","sharepoint:build:commitments-reader-prod":"ng build commitments-reader --configuration=sharepointprod","sharepoint:build":"run-p sharepoint:build:*","sharepoint:compile:policy-briefs":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/policy-briefs/Compile-Page.ps1","sharepoint:compile:commitments":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/Compile-Page.ps1 -applicationName 'commitments'","sharepoint:compile:commitments-reader":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/Compile-Page.ps1 -applicationName 'commitments-reader'","sharepoint:compile":"run-p sharepoint:compile:*","sharepoint:copyListDefinitions:commitments":"cpx ../sharepoint/commitments/ListDefinitions/*.* ../sharepoint/deploy/ListDefinitions/commitments","sharepoint:copyListDefinitions:commitments-reader":"cpx ../sharepoint/commitments-reader/ListDefinitions/*.* ../sharepoint/deploy/ListDefinitions/commitments-reader","sharepoint:copyListDefinitions:policy-briefs":"cpx ../sharepoint/policy-briefs/ListDefinitions/*.* ../sharepoint/deploy/ListDefinitions/policy-briefs","sharepoint:copyListDefinitions":"run-p sharepoint:copyListDefinitions:*","sharepoint:copyListData:commitments":"cpx ../sharepoint/commitments/Data/*.* ../sharepoint/deploy/ListData/commitments","sharepoint:copyListData:commitments-reader":"cpx ../sharepoint/commitments-reader/Data/*.* ../sharepoint/deploy/ListData/commitments-reader","sharepoint:copyListData:policy-briefs":"cpx ../sharepoint/policy-briefs/Data/*.* ../sharepoint/deploy/ListData/policy-briefs","sharepoint:copyListData":"run-p sharepoint:copyListData:*","sp:deploy:commitments":"run-s sharepoint:build:commitments sharepoint:compile:commitments sharepoint:copyListDefinitions:commitments sharepoint:copyListData:commitments deploy:js","sp:deploy:policy-briefs":"run-s sharepoint:build:policy-briefs sharepoint:compile:policy-briefs deploy:all:policy-briefs","sharepoint:build:deck":"ng build deck --configuration=sharepoint","sharepoint:compile:deck":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deck/Compile-Page.ps1","sharepoint:copyListDefinitions:deck":"cpx ../sharepoint/deck/ListDefinitions/*.* ../sharepoint/deploy/ListDefinitions/deck","sharepoint:copyListData:deck":"cpx ../sharepoint/deck/Data/*.* ../sharepoint/deploy/ListData/deck","sp:deploy:deck":"run-s sharepoint:build:deck sharepoint:compile:deck sharepoint:copyListDefinitions:deck sharepoint:copyListData:deck deploy:js","sp:deploy:commitments-reader":"run-s sharepoint:build:commitments-reader sharepoint:compile:commitments-reader sharepoint:copyListDefinitions:commitments-reader sharepoint:copyListData:commitments-reader deploy:all:commitments-reader","sp:deploy":"run-s sharepoint:* deploy:js","sp:all":"run-s sharepoint:* deploy:all"},"private":true,"dependencies":{"@agm/core":"^1.0.0-beta.5","@angular-mdc/theme":"^0.44.0","@angular-mdc/web":"^0.44.0","@angular/animations":"^7.2.13","@angular/cdk":"^7.3.7","@angular/common":"^7.2.13","@angular/compiler":"^7.2.13","@angular/core":"^7.2.13","@angular/forms":"^7.2.13","@angular/http":"^7.2.13","@angular/platform-browser":"^7.2.13","@angular/platform-browser-dynamic":"^7.2.13","@angular/router":"^7.2.13","@auth0/angular-jwt":"^2.1.0","@df/components":"^0.2.32014","@df/sharepoint":"0.0.29205","@df/utils":"0.0.29505","@dsuite/programs-manager-messages":"^1.0.31053","@material/animation":"^1.0.0","@material/base":"^1.0.0","@material/button":"^1.1.1","@material/card":"^1.1.1","@material/dialog":"^1.1.1","@material/drawer":"^1.1.1","@material/elevation":"^1.1.0","@material/floating-label":"^1.1.0","@material/line-ripple":"^1.1.0","@material/menu":"^1.1.1","@material/menu-surface":"^1.1.1","@material/notched-outline":"^1.1.1","@material/ripple":"^1.1.0","@material/rtl":"^0.42.0","@material/select":"^1.1.1","@material/shape":"^1.1.1","@material/tabs":"^1.0.1","@material/theme":"^1.1.0","@material/typography":"^1.0.0","@mdi/angular-material":"^3.6.95","@mdi/font":"^3.6.95","@ng-select/ng-select":"^2.17.0","@ngrx/effects":"^7.4.0","@ngrx/entity":"^7.4.0","@ngrx/router-store":"^7.4.0","@ngrx/store":"^7.4.0","@nrwl/nx":"^7.8.1","@swimlane/ngx-datatable":"^14.0.0","@types/jest":"^24.0.11","angular-tree-component":"^8.3.0","apollo-angular":"^1.5.0","apollo-angular-link-http":"^1.6.0","apollo-cache-inmemory":"^1.5.1","apollo-cache-persist":"^0.1.1","apollo-client":"^2.5.1","apollo-link":"^1.2.11","apollo-link-debounce":"^2.1.0","apollo-link-error":"^1.1.10","apollo-link-rest":"^0.7.2","bryntum-scheduler":"^2.0.31372","chart.js":"^2.8.0","classlist.js":"^1.1.20150312","codemirror":"^5.45.0","core-js":"^2.6.5","createjs-module":"^0.8.3","file-saver":"^2.0.1","graphql":"^14.2.1","graphql-anywhere":"^4.2.1","graphql-tag":"^2.10.1","highlightjs":"^9.12.0","indefinite":"^2.2.1","jquery":"^3.4.0","jspdf":"^1.5.3","localforage":"^1.7.3","markdown-it":"^8.4.2","marked":"^0.6.1","moment":"^2.24.0","ng2-charts":"^1.6.0","ngrx-store-localstorage":"^7.0.0","ngx-cookie-service":"^2.1.0","ngx-file-drop":"^6.0.0","ngx-markdown":"^7.1.5","ngx-wig":"^1.6.0","pdfmake":"^0.1.54","plantuml-encoder":"^1.2.5","punycode":"^2.1.1","raphael":"^2.2.8","rxjs":"^6.4.0","squire-rte":"^1.9.0","terser":"^3.17.0","to-mark":"^1.1.5","tslib":"^1.9.3","tui-chart":"^3.6.2","tui-code-snippet":"^1.5.1","tui-editor":"^1.4.0","typeface-roboto":"0.0.54","web-animations-js":"^2.3.1","x2js":"^3.2.6","xlsx":"^0.14.1","zone.js":"^0.8.29"},"devDependencies":{"@angular-devkit/build-angular":"^0.13.5","@angular/cli":"^7.3.8","@angular/compiler-cli":"^7.2.13","@angular/language-service":"^7.2.13","@graphql-codegen/cli":"^1.0.7","@graphql-codegen/typescript":"^1.0.7","@graphql-codegen/typescript-apollo-angular":"^1.0.7","@graphql-codegen/typescript-operations":"^1.0.7","@ngrx/schematics":"^7.4.0","@ngrx/store-devtools":"^7.4.0","@nrwl/builders":"^7.8.1","@nrwl/schematics":"^7.8.1","@types/googlemaps":"^3.30.19","@types/jasmine":"^3.3.12","@types/jasminewd2":"^2.0.6","@types/jquery":"^3.3.29","@types/node":"^11.13.4","codelyzer":"~4.5.0","cpx":"^1.5.0","jasmine-core":"^3.4.0","jasmine-marbles":"0.4.1","jasmine-spec-reporter":"~4.2.1","jest":"^24.7.1","jest-preset-angular":"^7.1.0","karma":"^4.1.0","karma-chrome-launcher":"~2.2.0","karma-coverage-istanbul-reporter":"^2.0.5","karma-jasmine":"~2.0.1","karma-jasmine-html-reporter":"^1.4.0","ngrx-store-freeze":"0.2.4","prettier":"^1.17.0","protractor":"^5.4.2","ts-node":"^8.1.0","tslint":"^5.16.0","typescript":"3.2.4"}};

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-full-layout.service.ts":
/*!********************************************!*\
  !*** ./src/app/app-full-layout.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var environment_1 = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var config_service_1 = __webpack_require__(/*! ./services/config.service */ "./src/app/services/config.service.ts");
var policy_briefs_data_service_1 = __webpack_require__(/*! ./services/policy-briefs-data.service */ "./src/app/services/policy-briefs-data.service.ts");
var AppFullLayoutService = /** @class */ (function () {
    function AppFullLayoutService(service, configuration) {
        var _this = this;
        this.service = service;
        this.configuration = configuration;
        this.appItems$ = new rxjs_1.BehaviorSubject(null);
        this.bookType$ = new rxjs_1.BehaviorSubject(null);
        this.logo$ = new rxjs_1.BehaviorSubject(null);
        this.protectiveMarking$ = new rxjs_1.BehaviorSubject(null);
        this.configSubscription$ = this.configuration.config.subscribe(function (c) {
            // tslint:disable-next-line:no-console
            console.log(c);
            _this._title = c.header.title;
            _this.appItems$.next(c.header.apps);
            _this.bookType$.next(c.header.bookType);
            _this.logo$.next(c.header.logo);
            _this.protectiveMarking$.next(c.header.classification);
        });
    }
    Object.defineProperty(AppFullLayoutService.prototype, "version", {
        get: function () {
            return environment_1.environment.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppFullLayoutService.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppFullLayoutService.prototype, "sidebarItems$", {
        get: function () {
            return rxjs_1.of([
                {
                    caption: 'Brief (Home)',
                    icon: 'format_bold',
                    routerLink: ['/']
                }
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppFullLayoutService.prototype, "drawerStyle", {
        get: function () {
            return 'dismissible';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppFullLayoutService.prototype, "drawOpen$", {
        get: function () {
            return this.service.getDrawState();
        },
        enumerable: true,
        configurable: true
    });
    AppFullLayoutService.prototype.setDrawState = function (appdrawerOpen) {
        return this.service.setDrawState(appdrawerOpen);
    };
    Object.defineProperty(AppFullLayoutService.prototype, "notification$", {
        get: function () {
            return this.service.Notification;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppFullLayoutService.prototype, "open$", {
        get: function () {
            return this.service.getBusy();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppFullLayoutService.prototype, "profile", {
        get: function () {
            return this.service.getCurrentUser();
        },
        enumerable: true,
        configurable: true
    });
    AppFullLayoutService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [policy_briefs_data_service_1.PolicyBriefsDataService,
            config_service_1.AppConfigService])
    ], AppFullLayoutService);
    return AppFullLayoutService;
}());
exports.AppFullLayoutService = AppFullLayoutService;


/***/ }),

/***/ "./src/app/app-init.ts":
/*!*****************************!*\
  !*** ./src/app/app-init.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function initApplication() {
    return function () {
        return new Promise(function (resolve) {
            // tslint:disable-next-line:no-console
            console.log('🥓 - app initialise started...');
            // store.pipe(select(fromRoot.getLoggedIn)).subscribe(isLoggedIn => {
            //   if (isLoggedIn) {
            //     // tslint:disable-next-line:no-console
            //     console.log('user is logged in, start auto token refresh')
            //     store.dispatch(new StartAutoTokenRefresh())
            //   }
            // })
            resolve(true);
        });
    };
}
exports.initApplication = initApplication;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
var df_layouts_1 = __webpack_require__(/*! @digital-first/df-layouts */ "../../libs/df-layouts/src/index.ts");
var df_pages_1 = __webpack_require__(/*! @digital-first/df-pages */ "../../libs/df-pages/src/index.ts");
var brief_component_1 = __webpack_require__(/*! ./pages/brief/brief.component */ "./src/app/pages/brief/brief.component.ts");
var routes = [
    { path: '', redirectTo: 'brief', pathMatch: 'full' },
    {
        path: 'brief',
        component: df_layouts_1.TitleLayoutComponent,
        data: {
            title: 'Brief'
        },
        children: [
            {
                path: '',
                component: brief_component_1.BriefComponent
            },
            {
                path: ':id',
                component: brief_component_1.BriefComponent
            }
        ]
    },
    {
        path: 'pages',
        component: df_layouts_1.SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: '404',
                component: df_pages_1.ErrorPageNotFoundComponent
            },
            {
                path: '500',
                component: df_pages_1.ErrorServerComponent
            }
        ]
    },
    { path: '**', redirectTo: 'pages/404' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        this.router = router;
        this.title = 'policy-briefs';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.router.events.subscribe(function (evt) {
            if (!(evt instanceof router_1.NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
    };
    AppComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-root',
            template: '<router-outlet></router-outlet>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
var app_component_1 = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var nx_1 = __webpack_require__(/*! @nrwl/nx */ "../../node_modules/@nrwl/nx/esm5/nrwl-nx.js");
var utils_1 = __webpack_require__(/*! @df/utils */ "../../node_modules/@df/utils/fesm5/df-utils.js");
var df_layouts_1 = __webpack_require__(/*! @digital-first/df-layouts */ "../../libs/df-layouts/src/index.ts");
var home_component_1 = __webpack_require__(/*! ./pages/home/home.component */ "./src/app/pages/home/home.component.ts");
var app_full_layout_service_1 = __webpack_require__(/*! ./app-full-layout.service */ "./src/app/app-full-layout.service.ts");
var app_routing_module_1 = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
var drag_drop_1 = __webpack_require__(/*! @angular/cdk/drag-drop */ "../../node_modules/@angular/cdk/esm5/drag-drop.es5.js");
var components_1 = __webpack_require__(/*! @df/components */ "../../node_modules/@df/components/fesm5/df-components.js");
var effects_1 = __webpack_require__(/*! @ngrx/effects */ "../../node_modules/@ngrx/effects/fesm5/effects.js");
var store_1 = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm5/store.js");
var navigation_effects_1 = __webpack_require__(/*! ./reducers/navigation/navigation.effects */ "./src/app/reducers/navigation/navigation.effects.ts");
var http_1 = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
var app_init_1 = __webpack_require__(/*! ./app-init */ "./src/app/app-init.ts");
var policy_briefs_data_service_1 = __webpack_require__(/*! ./services/policy-briefs-data.service */ "./src/app/services/policy-briefs-data.service.ts");
var brief_component_1 = __webpack_require__(/*! ./pages/brief/brief.component */ "./src/app/pages/brief/brief.component.ts");
var df_pages_1 = __webpack_require__(/*! @digital-first/df-pages */ "../../libs/df-pages/src/index.ts");
var df_pipes_1 = __webpack_require__(/*! @digital-first/df-pipes */ "../../libs/df-pipes/src/index.ts");
var df_theme_1 = __webpack_require__(/*! @digital-first/df-theme */ "../../libs/df-theme/src/index.ts");
var router_store_1 = __webpack_require__(/*! @ngrx/router-store */ "../../node_modules/@ngrx/router-store/fesm5/router-store.js");
var sharepoint_1 = __webpack_require__(/*! @df/sharepoint */ "../../node_modules/@df/sharepoint/fesm5/df-sharepoint.js");
var reducers_1 = __webpack_require__(/*! ./reducers */ "./src/app/reducers/index.ts");
var fromNavigation = __webpack_require__(/*! ./reducers/navigation/navigation.reducer */ "./src/app/reducers/navigation/navigation.reducer.ts");
var fromUser = __webpack_require__(/*! ./reducers/user/user.reducer */ "./src/app/reducers/user/user.reducer.ts");
var fromBrief = __webpack_require__(/*! ./reducers/brief/brief.reducer */ "./src/app/reducers/brief/brief.reducer.ts");
var fromDiscussion = __webpack_require__(/*! ./reducers/discussion/discussion.reducer */ "./src/app/reducers/discussion/discussion.reducer.ts");
var environment_1 = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var discussion_effects_1 = __webpack_require__(/*! ./reducers/discussion/discussion.effects */ "./src/app/reducers/discussion/discussion.effects.ts");
var brief_effects_1 = __webpack_require__(/*! ./reducers/brief/brief.effects */ "./src/app/reducers/brief/brief.effects.ts");
var app_effects_1 = __webpack_require__(/*! ./reducers/app.effects */ "./src/app/reducers/app.effects.ts");
var store_devtools_1 = __webpack_require__(/*! @ngrx/store-devtools */ "../../node_modules/@ngrx/store-devtools/fesm5/store-devtools.js");
var brief_document_component_1 = __webpack_require__(/*! ./containers/brief-document/brief-document.component */ "./src/app/containers/brief-document/brief-document.component.ts");
var COMPONENTS = [
    app_component_1.AppComponent,
    home_component_1.HomeComponent,
    brief_component_1.BriefComponent,
    brief_document_component_1.BriefDocumentComponent,
    components_1.DialogAreYouSureComponent
];
var ENTRYCOMPONENTS = [
    components_1.DialogAreYouSureComponent
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: COMPONENTS.slice(),
            entryComponents: ENTRYCOMPONENTS.slice(),
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                nx_1.NxModule.forRoot(),
                components_1.ButtonModule,
                components_1.PanelModule,
                components_1.RefinerModule,
                components_1.AvatarModule,
                components_1.DiscussionModule,
                components_1.DocumentModule,
                app_routing_module_1.AppRoutingModule,
                drag_drop_1.DragDropModule,
                sharepoint_1.DfSharepointLibModule,
                df_layouts_1.DfLayoutsModule,
                df_pages_1.DfPagesModule,
                df_pipes_1.DfPipesModule,
                df_theme_1.DfThemeModule,
                store_1.StoreModule.forRoot(reducers_1.reducers, {
                    metaReducers: reducers_1.metaReducers
                }),
                !environment_1.environment.production ? store_devtools_1.StoreDevtoolsModule.instrument() : [],
                store_1.StoreModule.forFeature('navigation', fromNavigation.reducer),
                store_1.StoreModule.forFeature('user', fromUser.reducer),
                store_1.StoreModule.forFeature('discussion', fromDiscussion.reducer),
                store_1.StoreModule.forFeature('brief', fromBrief.reducer),
                effects_1.EffectsModule.forRoot([app_effects_1.AppEffects]),
                effects_1.EffectsModule.forFeature([
                    navigation_effects_1.NavigationEffects,
                    brief_effects_1.BriefEffects,
                    discussion_effects_1.DiscussionEffects
                ])
            ],
            providers: [
                utils_1.WINDOW_PROVIDERS,
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: app_init_1.initApplication,
                    deps: [],
                    multi: true
                },
                sharepoint_1.SharepointJsomService,
                policy_briefs_data_service_1.PolicyBriefsDataService,
                { provide: df_layouts_1.TitleLayoutService, useClass: app_full_layout_service_1.AppFullLayoutService },
                /**
                 * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
                 * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
                 * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
                 */
                { provide: router_store_1.RouterStateSerializer, useClass: reducers_1.CustomSerializer }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/containers/brief-document/brief-document.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/containers/brief-document/brief-document.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [innerHtml]=\"briefHtml$ | async | safeHtml\"></div>"

/***/ }),

/***/ "./src/app/containers/brief-document/brief-document.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/containers/brief-document/brief-document.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHBzL3BvbGljeS1icmllZnMvc3JjL2FwcC9jb250YWluZXJzL2JyaWVmLWRvY3VtZW50L2JyaWVmLWRvY3VtZW50LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/containers/brief-document/brief-document.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/containers/brief-document/brief-document.component.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var BriefDocumentComponent = /** @class */ (function () {
    function BriefDocumentComponent(http) {
        this.http = http;
        this.briefHtml$ = new rxjs_1.BehaviorSubject(null);
    }
    Object.defineProperty(BriefDocumentComponent.prototype, "brief", {
        get: function () {
            return this._brief;
        },
        set: function (value) {
            this._brief = value;
            if (this._brief && this._brief.fileLeafRef) {
                // clear extension
                var fileLeafRef = this._brief.fileLeafRef
                    .split('.')
                    .slice(0, -1)
                    .join('.');
                this.getBriefHtml(fileLeafRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    BriefDocumentComponent.prototype.getBriefHtml = function (fileLeafRef) {
        var _this = this;
        var relativeUrl = _spPageContextInfo.webAbsoluteUrl + "/BriefHTML/" + fileLeafRef + ".aspx";
        return this.http
            .get(relativeUrl, { responseType: 'text' })
            .pipe(operators_1.first())
            .subscribe(function (html) {
            _this.briefHtml$.next(html);
        });
    };
    BriefDocumentComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], BriefDocumentComponent.prototype, "brief", null);
    BriefDocumentComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-brief-document',
            template: __webpack_require__(/*! ./brief-document.component.html */ "./src/app/containers/brief-document/brief-document.component.html"),
            styles: [__webpack_require__(/*! ./brief-document.component.scss */ "./src/app/containers/brief-document/brief-document.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], BriefDocumentComponent);
    return BriefDocumentComponent;
}());
exports.BriefDocumentComponent = BriefDocumentComponent;


/***/ }),

/***/ "./src/app/pages/brief/brief.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/brief/brief.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-page\">\r\n  <div class=\"brief-layout\">\r\n    <nav>\r\n      <df-pack-navigator\r\n        [nodes]=\"nodes$ | async\"\r\n        (onSelect)=\"handleSelectNavigatorNode($event)\"\r\n        (onMoveNode)=\"handleToggleMoveNavigatorNode($event, 'Move')\"\r\n        (onToggleExpand)=\"handleToggleExpandNavigatorNode($event)\"\r\n      ></df-pack-navigator>\r\n    </nav>\r\n    <section>\r\n      <df-expander-panel *ngIf=\"(brief$ | async) as brief\"\r\n        title=\"Discussion\"\r\n        [background]=\"background$ | async\"\r\n        expanded=\"true\"\r\n      >\r\n        <df-discussion\r\n          [hostId]=\"brief.id\"\r\n          [comments]=\"comments$ | async\"\r\n          [activeComment]=\"activeComment$ | async\"\r\n          (onReplyToComment)=\"handleReplyToComment($event, 'onReplyToComment')\"\r\n          (onDeleteComment)=\"handleRemoveComment($event, 'onRemoveComment')\"\r\n          (onAddComment)=\"handleAddComment($event, 'onAddComment')\"\r\n        ></df-discussion>\r\n      </df-expander-panel>\r\n      <df-expander-panel *ngIf=\"(brief$ | async) as brief\"\r\n        [title]=\"brief.title\"\r\n        [background]=\"background$ | async\"\r\n        expandable=\"false\"\r\n        expanded=\"true\"\r\n      >\r\n        <ng-container panel-buttons>\r\n          <span class=\"brief-reference\">{{brief.reference}}</span>\r\n          <df-button\r\n            class=\"edit\"\r\n            title=\"Edit\"\r\n            icon=\"edit\"\r\n            [background]=\"background$ | async\"\r\n            (onClick)=\"handleEdit($event)\"\r\n          ></df-button>\r\n          <df-button\r\n            title=\"Subscribe\"\r\n            icon=\"add_alert\"\r\n            [background]=\"background$ | async\"\r\n            (onClick)=\"handleEdit($event)\"\r\n          ></df-button>\r\n          <df-button\r\n            title=\"Admin\"\r\n            icon=\"settings\"\r\n            [background]=\"background$ | async\"\r\n            (onClick)=\"handleEdit($event)\"\r\n          ></df-button>\r\n        </ng-container>\r\n        <div class=\"GhostWhite brief-document\">\r\n          <form [formGroup]=\"form\" (ngSubmit)=\"handleSubmit($event)\" autocomplete=\"off\">\r\n            <df-status-picker\r\n              [statuses]=\"documentStatusList$ | async\"\r\n              [formControlName]=\"'status'\"\r\n            >\r\n            </df-status-picker>\r\n            <div>\r\n                <div class=\"brief-protective-marking\"><strong>{{brief.securityClassification}} {{brief.dLM}}</strong></div>\r\n            </div>\r\n            <digital-first-brief-document [brief]=\"brief\"></digital-first-brief-document>\r\n          </form>\r\n        </div>\r\n      </df-expander-panel>\r\n    </section>\r\n  </div>\r\n  <div class=\"brief-layout\">\r\n    <section>\r\n      <pre>{{ this.nodes$ | async }}</pre>\r\n      <p>Form Status: {{ form.status }}</p>\r\n      <pre>{{ form.value | json }}</pre>\r\n    </section>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/brief/brief.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/brief/brief.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  width: -webkit-fill-available;\n  display: flex;\n  flex-direction: column; }\n\ndf-button.edit {\n  min-width: 80px; }\n\ndf-status-picker {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.brief-protective-marking {\n  color: red;\n  width: 100%;\n  text-align: center; }\n\n.brief-reference {\n  min-width: 170px;\n  width: 170px;\n  padding-right: 20px;\n  text-align: right; }\n\n.brief-document {\n  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);\n  background-color: white !important;\n  color: #424242 !important;\n  padding: 5px 64px;\n  width: calc(100% - 128px);\n  overflow-x: hidden; }\n\n.brief-layout {\n  display: flex;\n  flex-direction: row; }\n\n.brief-layout nav {\n    padding: 6px;\n    width: 350px;\n    display: flex;\n    flex-direction: column; }\n\n.brief-layout section {\n    width: 100%;\n    display: flex;\n    flex-direction: column; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHMvcG9saWN5LWJyaWVmcy9zcmMvYXBwL3BhZ2VzL2JyaWVmL0M6XFxVc2Vyc1xcYWpraXRzb25cXHJlcG9zXFxERi1DbGllbnRcXGRpZ2l0YWwtZmlyc3QvYXBwc1xccG9saWN5LWJyaWVmc1xcc3JjXFxhcHBcXHBhZ2VzXFxicmllZlxcYnJpZWYuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsNkJBQTZCO0VBQzdCLGFBQWE7RUFDYixzQkFBc0IsRUFBQTs7QUFHeEI7RUFDRSxlQUFlLEVBQUE7O0FBR2pCO0VBQ0ksYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSxVQUFVO0VBQ1YsV0FBVztFQUNYLGtCQUNKLEVBQUE7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSxnSEFDbUM7RUFDbkMsa0NBQStDO0VBQy9DLHlCQUFpQztFQUVqQyxpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLGFBQWE7RUFDYixtQkFBbUIsRUFBQTs7QUFGckI7SUFLSSxZQUFZO0lBQ1osWUFBWTtJQUNaLGFBQWE7SUFDYixzQkFBc0IsRUFBQTs7QUFSMUI7SUFZSSxXQUFXO0lBQ1gsYUFBYTtJQUNiLHNCQUFzQixFQUFBIiwiZmlsZSI6ImFwcHMvcG9saWN5LWJyaWVmcy9zcmMvYXBwL3BhZ2VzL2JyaWVmL2JyaWVmLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuZGYtYnV0dG9uLmVkaXQge1xyXG4gIG1pbi13aWR0aDogODBweDtcclxufVxyXG5cclxuZGYtc3RhdHVzLXBpY2tlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5icmllZi1wcm90ZWN0aXZlLW1hcmtpbmcge1xyXG4gICAgY29sb3I6IHJlZDsgXHJcbiAgICB3aWR0aDogMTAwJTsgXHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXJcclxufVxyXG5cclxuLmJyaWVmLXJlZmVyZW5jZSB7XHJcbiAgbWluLXdpZHRoOiAxNzBweDtcclxuICB3aWR0aDogMTcwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMjBweDtcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxufVxyXG5cclxuLmJyaWVmLWRvY3VtZW50IHtcclxuICBib3gtc2hhZG93OiAwIDRweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDFweCAxMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKSxcclxuICAgIDAgMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSkgIWltcG9ydGFudDtcclxuICBjb2xvcjogcmdiKDY2LCA2NiwgNjYpICFpbXBvcnRhbnQ7XHJcblxyXG4gIHBhZGRpbmc6IDVweCA2NHB4O1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxMjhweCk7XHJcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG59XHJcblxyXG4uYnJpZWYtbGF5b3V0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblxyXG4gIG5hdiB7XHJcbiAgICBwYWRkaW5nOiA2cHg7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcblxyXG4gIHNlY3Rpb24ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/pages/brief/brief.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/brief/brief.component.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
var components_1 = __webpack_require__(/*! @df/components */ "../../node_modules/@df/components/fesm5/df-components.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var mock_data_1 = __webpack_require__(/*! ./mock-data */ "./src/app/pages/brief/mock-data.ts");
var store_1 = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm5/store.js");
var fromNavigation = __webpack_require__(/*! ../../reducers/navigation/navigation.reducer */ "./src/app/reducers/navigation/navigation.reducer.ts");
var fromBrief = __webpack_require__(/*! ../../reducers/brief/brief.reducer */ "./src/app/reducers/brief/brief.reducer.ts");
var fromDiscussion = __webpack_require__(/*! ../../reducers/discussion/discussion.reducer */ "./src/app/reducers/discussion/discussion.reducer.ts");
var navigation_actions_1 = __webpack_require__(/*! ../../reducers/navigation/navigation.actions */ "./src/app/reducers/navigation/navigation.actions.ts");
var discussion_actions_1 = __webpack_require__(/*! ../../reducers/discussion/discussion.actions */ "./src/app/reducers/discussion/discussion.actions.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
var brief_actions_1 = __webpack_require__(/*! ../../reducers/brief/brief.actions */ "./src/app/reducers/brief/brief.actions.ts");
var web_1 = __webpack_require__(/*! @angular-mdc/web */ "../../node_modules/@angular-mdc/web/esm5/web.es5.js");
var defaultBrief = {
    status: '1'
};
var BriefComponent = /** @class */ (function () {
    // tslint:disable-next-line:no-empty
    function BriefComponent(route, router, fb, store, dialog) {
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.store = store;
        this.dialog = dialog;
        this.background$ = new rxjs_1.BehaviorSubject('#455a64');
        this.form = this.fb.group({
            status: [null]
        });
    }
    BriefComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nodes$ = this.store.pipe(store_1.select(fromNavigation.selectNavigationNodeTreeState), 
        // tslint:disable-next-line: no-console
        operators_1.tap(function (result) { return console.log("\uD83C\uDF32 ", result); }));
        this.comments$ = this.store.pipe(store_1.select(fromDiscussion.selectDiscussionState), 
        // tslint:disable-next-line: no-console
        operators_1.tap(function (result) { return console.log("\uD83D\uDC79 ", result); }));
        this.documentStatusList$ = new rxjs_1.BehaviorSubject(mock_data_1.statuslist);
        this.brief$ = this.store.pipe(store_1.select(fromBrief.selectBriefState));
        this.fileLeafRef$ = this.store.pipe(store_1.select(fromBrief.selectFileLeafRefState));
        this.activeComment$ = this.store.pipe(store_1.select(fromDiscussion.selectActiveCommentState));
        this.selectId$ = this.route.paramMap
            .pipe(operators_1.switchMap(function (params) {
            var activeBriefId = params.get('id');
            _this.store.dispatch(new brief_actions_1.SetActiveBrief({ activeBriefId: activeBriefId }));
            _this.store.dispatch(new discussion_actions_1.GetDiscussion({ activeBriefId: activeBriefId }));
            return rxjs_1.EMPTY;
        }))
            .subscribe();
        this.store.dispatch(new navigation_actions_1.GetNavigations());
        this.form.patchValue(defaultBrief);
        this.formValueChangeSubscription$ = this.form.valueChanges
            .pipe(operators_1.debounceTime(3000), operators_1.distinctUntilChanged())
            .subscribe(function (blurEvent) {
            _this.handleChange(blurEvent);
            _this.formValueChangeSubscription$.unsubscribe();
        });
    };
    BriefComponent.prototype.ngOnDestroy = function () { };
    BriefComponent.prototype.handleChange = function ($event) {
        // tslint:disable-next-line:no-console
        console.log('🐛 - handleChange', $event);
    };
    BriefComponent.prototype.mapFormToBrief = function (brief) {
        var editedBrief = tslib_1.__assign({}, brief);
        return editedBrief;
    };
    BriefComponent.prototype.handleSubmit = function ($event) {
        // tslint:disable-next-line:no-console
        console.log('🐛 - handleSubmit', $event);
    };
    BriefComponent.prototype.handleSelect = function ($event) {
        // tslint:disable-next-line:no-console
        console.log("\uD83D\uDC0B -  Select", $event);
    };
    BriefComponent.prototype.handleToggleExpandNavigatorNode = function ($event) {
        // tslint:disable-next-line:no-console
        console.log("\uD83C\uDFAF -  handleToggleExpandNavigatorNode", $event);
        this.store.dispatch(new navigation_actions_1.ToggleExpand({ id: $event.node.data.id, expanded: $event.isExpanded }));
    };
    BriefComponent.prototype.handleSelectNavigatorNode = function (node) {
        this.router.navigate(['/', 'brief', node.data.briefId]);
    };
    BriefComponent.prototype.handleReplyToComment = function (comment) {
        // tslint:disable-next-line:no-console
        console.log("\uD83D\uDCAC -  ReplyToComment", comment);
        this.store.dispatch(new discussion_actions_1.ReplyToComment({ activeComment: comment.id }));
    };
    BriefComponent.prototype.handleRemoveComment = function ($event) {
        var _this = this;
        // tslint:disable-next-line:no-console
        console.log("\uD83D\uDCAC -  RemoveComment", $event);
        var dialogRef = this.dialog.open(components_1.DialogAreYouSureComponent, {
            escapeToClose: true,
            clickOutsideToClose: true
        });
        dialogRef
            .afterClosed()
            .pipe(operators_1.first())
            .subscribe(function (result) {
            if (result === components_1.ARE_YOU_SURE_ACCEPT) {
                _this.store.dispatch(new discussion_actions_1.RemoveComment({ id: $event.id, brief: $event.hostId }));
            }
        });
    };
    BriefComponent.prototype.handleAddComment = function ($event) {
        var parent = $event.parent;
        var newcomment = {
            brief: $event.hostId,
            text: $event.text,
            parent: parent ? parent.id : null
        };
        // tslint:disable-next-line:no-console
        console.log("\uD83D\uDCAC -  AddComment", $event, newcomment);
        this.store.dispatch(new discussion_actions_1.AddComment(newcomment));
    };
    BriefComponent.prototype.handleToggleMoveNavigatorNode = function ($event, action) {
        // tslint:disable-next-line:no-console
        console.log("\uD83D\uDC39 - " + action, $event);
    };
    BriefComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-brief',
            template: __webpack_require__(/*! ./brief.component.html */ "./src/app/pages/brief/brief.component.html"),
            styles: [__webpack_require__(/*! ./brief.component.scss */ "./src/app/pages/brief/brief.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            forms_1.FormBuilder,
            store_1.Store,
            web_1.MdcDialog])
    ], BriefComponent);
    return BriefComponent;
}());
exports.BriefComponent = BriefComponent;


/***/ }),

/***/ "./src/app/pages/brief/mock-data.ts":
/*!******************************************!*\
  !*** ./src/app/pages/brief/mock-data.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! @df/utils */ "../../node_modules/@df/utils/fesm5/df-utils.js");
exports.navigatorData = [
    {
        id: 'ddf2e782-c890-5df3-8169-d94c099e60c1',
        parent: null,
        caption: 'qui in est',
        meta: 'last updated 1/1/2019',
        colour: 'GoldenRod',
        order: 17,
        active: false,
        expanded: false
    },
    {
        id: 'd28dd1d7-7a03-53e2-8620-7cc9801fb091',
        parent: 'ddf2e782-c890-5df3-8169-d94c099e60c1',
        caption: 'fugit sint officia',
        meta: '3 new',
        colour: 'GoldenRod',
        order: 65,
        active: false,
        expanded: false
    },
    {
        id: '6e163c94-eca8-54bf-9857-95988c2742c6',
        parent: 'ddf2e782-c890-5df3-8169-d94c099e60c1',
        caption: 'exercitationem illum voluptas',
        meta: '',
        colour: 'GoldenRod',
        order: 54,
        active: false,
        expanded: false
    },
    {
        id: 'b47463dc-63b7-5feb-b006-8558b6e67a72',
        parent: 'd28dd1d7-7a03-53e2-8620-7cc9801fb091',
        caption: 'aut eveniet voluptatem',
        meta: 'last updated 1/1/2019',
        colour: 'GoldenRod',
        order: 41,
        active: false,
        expanded: false
    },
    {
        id: 'b99c94cc-4c87-51c2-ad8b-71966991116b',
        parent: '6e163c94-eca8-54bf-9857-95988c2742c6',
        caption: 'quisquam natus enim',
        meta: 'last updated 1/1/2019',
        colour: 'GoldenRod',
        order: 4,
        active: false,
        expanded: false
    },
    {
        id: '329ce8ed-5e8c-52aa-984a-e3615463d392',
        parent: null,
        caption: 'quo iure similique',
        meta: 'last updated 1/1/2019',
        colour: 'Crimson',
        order: 43,
        active: false,
        expanded: true
    },
    {
        id: '6b7563f1-8e30-5d96-8495-9d99c3cf3fab',
        parent: 'fec1cadd-0fff-599c-b1a4-49b7349a4d57',
        caption: 'eos omnis nesciunt',
        meta: 'last updated 1/1/2019',
        colour: 'Crimson',
        order: 99,
        active: true,
        expanded: false
    },
    {
        id: 'e6976877-f03d-5a39-a8d0-3baee5365476',
        parent: '329ce8ed-5e8c-52aa-984a-e3615463d392',
        caption: 'quibusdam excepturi pariatur',
        meta: 'last updated 1/1/2019',
        colour: 'Crimson',
        order: 1,
        active: false,
        expanded: false
    },
    {
        id: 'fec1cadd-0fff-599c-b1a4-49b7349a4d57',
        parent: 'e6976877-f03d-5a39-a8d0-3baee5365476',
        caption: 'quia sunt facilis',
        meta: 'last updated 1/1/2019',
        colour: 'Crimson',
        order: 39,
        active: false,
        expanded: false
    },
    {
        id: 'fec1cadd-0fff-599c-b1a4-49b7349a4d51',
        parent: 'fec1cadd-0fff-599c-b1a4-49b7349a4d57',
        caption: '4 deep',
        meta: 'last updated 1/1/2019',
        colour: 'Crimson',
        order: 39,
        active: false,
        expanded: false
    },
    {
        id: 'e9861dad-d68e-5aa6-9ee9-96eb46534a4a',
        parent: 'fec1cadd-0fff-599c-b1a4-49b7349a4d57',
        caption: 'ipsam facilis totam',
        meta: 'last updated 1/1/2019',
        colour: 'Crimson',
        order: 10,
        active: false,
        expanded: false
    }
];
exports.statuslist = [
    {
        id: '1',
        icon: 'people',
        caption: 'In Draft',
        colour: 'Pink',
        order: 1
    },
    {
        id: '2',
        icon: 'how_to_reg',
        caption: 'Ready',
        colour: 'GhostWhite',
        order: 2
    },
    {
        id: '3',
        icon: 'cancel_presentation',
        caption: 'Cancelled',
        colour: 'Crimson',
        order: 3
    }
];
exports.demoAuthor = {
    username: 'demoAuthor',
    name: 'Demo Author',
    email: 'DemoAuthor@yahoo.com',
    phone: '555 555 555 555',
    color: 'rgb(200, 70, 70)'
};
exports.discussionItems = {
    timeFormat: 'dateFormat',
    activeComment: null,
    comments: [
        {
            id: 'c8bfffbcd25241e09272079538d089c1',
            commitment: 20,
            text: "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi\n        amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale.\n        Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water\n         spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea\n         gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress.\n        Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.",
            created: '2018-11-28T20:36:06.878Z',
            parent: null,
            author: {
                username: 'Domenica20',
                name: 'Alysson Kunde',
                email: 'Carroll_Bradtke33@yahoo.com',
                phone: '077.179.3639 x402',
                color: 'rgb(84, 70, 126)'
            }
        },
        {
            id: '549e2c69631e4e40a623266b87a95de3',
            commitment: 20,
            text: "Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery.\n        Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut\n        eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley j\u00EDcama salsify.",
            created: '2018-11-28T21:00:32.815Z',
            parent: 'c8bfffbcd25241e09272079538d089c1',
            author: {
                username: 'personfreak',
                name: 'John Person',
                email: 'JohnPerson@yahoo.com',
                phone: '077.179.3639 x402',
                color: 'tomato'
            }
        },
        {
            id: 'a230a600cab6480b9bcc2ed54d7c4751',
            commitment: 20,
            text: "Beetroot water spinach okra water chestnut\n        ricebean pea catsear courgette summer purslane.\n        Water spinach arugula pea tatsoi aubergine spring onion bush tomato kale radicchio\n        turnip chicory salsify pea sprouts fava bean. Dandelion zucchini burdock yarrow chickpea\n        dandelion sorrel courgette turnip greens tigernut soybean radish artichoke wattle seed endive groundnut broccoli arugula.',\n        created: '2018-11-28T21:55:41.909Z",
            parent: null,
            author: {
                username: 'Domenica20',
                name: 'Alysson Kunde',
                email: 'Carroll_Bradtke33@yahoo.com',
                phone: '077.179.3639 x402',
                color: 'rgb(84, 70, 126)'
            }
        },
        {
            id: 'afb99e51d1a74187bc9bc9bb7f903e56',
            commitment: 20,
            text: "Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea\n        lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory\n         garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi\n          rutabaga tigernut. Sea lettuce gumbo grape kale kombu cauliflower salsify\n           kohlrabi okra sea lettuce broccoli celery lotus root carrot winter\n            purslane turnip greens garlic. J\u00EDcama garlic courgette coriander\n             radicchio plantain scallion cauliflower fava bean desert raisin\n              spring onion chicory bunya nuts. Sea lettuce water spinach gram\n               fava bean leek dandelion silver beet eggplant bush tomato.",
            created: '2018-12-02T21:24:18.932Z',
            parent: null,
            author: {
                username: 'Carroll_Bradtke',
                name: 'Carroll Bradtke',
                email: 'Carroll_Bradtke33@yahoo.com',
                phone: '077.179.3639 x402',
                color: '#333333'
            }
        }
    ],
    loading: false
};
exports.discussionTree = utils_1.toTree(exports.discussionItems.comments, {
    id: 'id',
    parentId: 'parent',
    children: 'children',
    level: 'level',
    firstParentId: null
});
exports.baconIpsum = "\n<div class=\"anyipsum-output\">\n<p>Bacon ipsum dolor amet pork belly landjaeger fatback, frankfurter biltong cow leberkas.\nBall tip bacon fatback pancetta ribeye filet mignon, jerky meatloaf.\nCow ham hock boudin strip steak picanha t-bone.\nSalami buffalo spare ribs, drumstick short loin beef bacon pork turkey short ribs brisket rump sausage pork belly.\nBiltong tail frankfurter meatball strip steak beef ribs ham pork chop ground round.\nLeberkas strip steak turducken shoulder landjaeger jerky.</p><p>Frankfurter venison porchetta,\nalcatra shank tongue bacon pancetta pork chop filet mignon.\nHam hock pork sausage, porchetta andouille meatball beef ribs shank burgdoggen meatloaf ham ribeye tongue shoulder.\nShoulder chicken kielbasa pork loin, venison rump t-bone burgdoggen frankfurter tongue.\nBeef ribs kielbasa pork loin short ribs porchetta ground round tongue drumstick.\n</p>\n<p>Filet mignon pork belly landjaeger, frankfurter fatback buffalo jerky drumstick salami corned beef kevin pork loin short ribs.\n Frankfurter flank strip steak ham pastrami ground round leberkas meatloaf sirloin cow prosciutto filet mignon sausage chuck.\n Ham hock frankfurter capicola, landjaeger pork chop shank beef.  Strip steak capicola picanha alcatra kielbasa short ribs shankle\nturkey pastrami turducken ground round.</p><p>Venison cupim pork belly, ball tip chicken pork chop shank jowl capicola brisket\nprosciutto shoulder.  Picanha sirloin alcatra fatback turkey beef cow frankfurter tenderloin salami.\nCapicola buffalo cupim pancetta.  Pork cow alcatra strip steak.\nChuck ground round ham venison filet mignon ribeye.</p><p>Shankle jowl pancetta andouille swine corned beef.\nHamburger boudin ham hock turducken spare ribs rump filet mignon cupim leberkas pig.\nTenderloin t-bone shankle, bresaola filet mignon pork belly spare ribs swine biltong beef ribs short loin.\nBuffalo short loin venison tongue short ribs bacon chuck pork chop kielbasa hamburger sausage shoulder.\n</p>\n</div>\n";


/***/ }),

/***/ "./src/app/pages/home/home.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-page\">\r\n  <section>\r\n    <df-expander-panel\r\n      title=\"Home\"\r\n      [background]=\"background$ | async\"\r\n      [expandable]=\"false\"\r\n    >\r\n      <ng-container panel-buttons>\r\n        <df-button\r\n          title=\"Add Item\"\r\n          [background]=\"background$ | async\"\r\n          (onClick)=\"handleEvent($event, 'Add Item Clicked')\"\r\n        ></df-button>\r\n      </ng-container>\r\n    </df-expander-panel>\r\n\r\n    <p>Home</p>\r\n  </section>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/home/home.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHBzL3BvbGljeS1icmllZnMvc3JjL2FwcC9wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/home/home.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/pages/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/pages/home/home.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ "./src/app/reducers/app.actions.ts":
/*!*****************************************!*\
  !*** ./src/app/reducers/app.actions.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppActionTypes;
(function (AppActionTypes) {
    AppActionTypes["StartAppInitialiser"] = "[App] Start App Initialiser";
    AppActionTypes["FinishAppInitialiser"] = "[App] Finish App Initialiser";
    AppActionTypes["AppNotification"] = "[App] AppNotification";
    AppActionTypes["ClearAppNotification"] = "[App] Clear AppNotification";
    AppActionTypes["SetLayoutDrawState"] = "[App] Set Layout Draw State";
})(AppActionTypes = exports.AppActionTypes || (exports.AppActionTypes = {}));
var StartAppInitialiser = /** @class */ (function () {
    function StartAppInitialiser(payload) {
        this.payload = payload;
        this.type = AppActionTypes.StartAppInitialiser;
    }
    return StartAppInitialiser;
}());
exports.StartAppInitialiser = StartAppInitialiser;
var FinishAppInitialiser = /** @class */ (function () {
    function FinishAppInitialiser() {
        this.type = AppActionTypes.FinishAppInitialiser;
    }
    return FinishAppInitialiser;
}());
exports.FinishAppInitialiser = FinishAppInitialiser;
var AppNotification = /** @class */ (function () {
    function AppNotification(payload) {
        this.payload = payload;
        this.type = AppActionTypes.AppNotification;
    }
    return AppNotification;
}());
exports.AppNotification = AppNotification;
var ClearAppNotification = /** @class */ (function () {
    function ClearAppNotification() {
        this.type = AppActionTypes.ClearAppNotification;
    }
    return ClearAppNotification;
}());
exports.ClearAppNotification = ClearAppNotification;
var SetLayoutDrawState = /** @class */ (function () {
    function SetLayoutDrawState(state) {
        this.state = state;
        this.type = AppActionTypes.SetLayoutDrawState;
    }
    return SetLayoutDrawState;
}());
exports.SetLayoutDrawState = SetLayoutDrawState;


/***/ }),

/***/ "./src/app/reducers/app.effects.ts":
/*!*****************************************!*\
  !*** ./src/app/reducers/app.effects.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var effects_1 = __webpack_require__(/*! @ngrx/effects */ "../../node_modules/@ngrx/effects/fesm5/effects.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var app_data_service_1 = __webpack_require__(/*! ../services/app-data.service */ "./src/app/services/app-data.service.ts");
var app_actions_1 = __webpack_require__(/*! ./app.actions */ "./src/app/reducers/app.actions.ts");
var user_actions_1 = __webpack_require__(/*! ./user/user.actions */ "./src/app/reducers/user/user.actions.ts");
var AppEffects = /** @class */ (function () {
    function AppEffects(actions$, service) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.startAppInitialiser$ = this.actions$
            .pipe(effects_1.ofType(app_actions_1.AppActionTypes.StartAppInitialiser), operators_1.map(function (action) { return action.payload.environment; }), operators_1.concatMap(function (environment) {
            return _this.service.getCurrentUser()
                .pipe(operators_1.concatMap(function (user) { return [
                new user_actions_1.SetCurrentUser(user),
                new user_actions_1.GetUserOperations(user.roles)
            ]; }));
        }));
        this.getUserOperations$ = this.actions$
            .pipe(effects_1.ofType(user_actions_1.UserActionTypes.GetUserOperations), operators_1.map(function (action) { return action.payload; }), operators_1.concatMap(function (roles) {
            return _this.service.getCurrentUserOperations(roles)
                .pipe(operators_1.concatMap(function (result) { return [
                new user_actions_1.SetUserOperations(result)
            ]; }));
        }));
    }
    tslib_1.__decorate([
        effects_1.Effect(),
        tslib_1.__metadata("design:type", rxjs_1.Observable)
    ], AppEffects.prototype, "startAppInitialiser$", void 0);
    tslib_1.__decorate([
        effects_1.Effect(),
        tslib_1.__metadata("design:type", rxjs_1.Observable)
    ], AppEffects.prototype, "getUserOperations$", void 0);
    AppEffects = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [effects_1.Actions, app_data_service_1.AppDataService])
    ], AppEffects);
    return AppEffects;
}());
exports.AppEffects = AppEffects;


/***/ }),

/***/ "./src/app/reducers/brief/brief.actions.ts":
/*!*************************************************!*\
  !*** ./src/app/reducers/brief/brief.actions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BriefActionTypes;
(function (BriefActionTypes) {
    BriefActionTypes["LoadBrief"] = "[Brief] Load Brief";
    BriefActionTypes["SetActiveBrief"] = "[Brief] Set Active Brief";
    BriefActionTypes["GetActiveBriefFailure"] = "[Brief] Get Active Brief Failure";
})(BriefActionTypes = exports.BriefActionTypes || (exports.BriefActionTypes = {}));
var SetActiveBrief = /** @class */ (function () {
    function SetActiveBrief(payload) {
        this.payload = payload;
        this.type = BriefActionTypes.SetActiveBrief;
    }
    return SetActiveBrief;
}());
exports.SetActiveBrief = SetActiveBrief;
var LoadBrief = /** @class */ (function () {
    function LoadBrief(payload) {
        this.payload = payload;
        this.type = BriefActionTypes.LoadBrief;
    }
    return LoadBrief;
}());
exports.LoadBrief = LoadBrief;
var GetActiveBriefFailure = /** @class */ (function () {
    function GetActiveBriefFailure(payload) {
        this.payload = payload;
        this.type = BriefActionTypes.GetActiveBriefFailure;
    }
    return GetActiveBriefFailure;
}());
exports.GetActiveBriefFailure = GetActiveBriefFailure;


/***/ }),

/***/ "./src/app/reducers/brief/brief.effects.ts":
/*!*************************************************!*\
  !*** ./src/app/reducers/brief/brief.effects.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var effects_1 = __webpack_require__(/*! @ngrx/effects */ "../../node_modules/@ngrx/effects/fesm5/effects.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var brief_actions_1 = __webpack_require__(/*! ./brief.actions */ "./src/app/reducers/brief/brief.actions.ts");
var sharepoint_1 = __webpack_require__(/*! @df/sharepoint */ "../../node_modules/@df/sharepoint/fesm5/df-sharepoint.js");
var caml_1 = __webpack_require__(/*! ../../services/sharepoint/caml */ "./src/app/services/sharepoint/caml.ts");
exports.mapBrief = function (item) {
    var editor = sharepoint_1.fromLookup(item.Editor);
    var subPolicy = sharepoint_1.fromLookup(item.SubPolicy);
    var policy = sharepoint_1.fromLookup(item.Policy);
    var briefStatus = sharepoint_1.fromLookup(item.BriefStatus);
    var briefDivision = sharepoint_1.fromLookup(item.BriefStatus);
    return {
        id: item.ID,
        fileLeafRef: item.FileLeafRef,
        title: item.Title,
        reference: item.Reference,
        securityClassification: item.SecurityClassification,
        dLM: item.DLM,
        policyDirection: item.PolicyDirection,
        order: item.SortOrder,
        modified: item.Modified,
        dueDate: item.DueDate,
        editor: editor,
        subPolicy: subPolicy,
        policy: policy,
        briefStatus: briefStatus,
        briefDivision: briefDivision
    };
};
exports.mapBriefs = function (items) { return (items || []).map(exports.mapBrief); };
exports.recommendedDirection = function (item) {
    var brief = sharepoint_1.idFromLookup(item.Brief);
    var recommendation = sharepoint_1.idFromLookup(item.Recommendation);
    return {
        id: item.ID,
        title: item.Title,
        recommendation: recommendation,
        brief: brief
    };
};
exports.recommendedDirections = function (items) {
    return (items || []).map(exports.recommendedDirection);
};
exports.mapAttachment = function (item) {
    var brief = sharepoint_1.idFromLookup(item.Brief);
    return {
        id: item.ID,
        FileLeafRef: item.FileLeafRef,
        notes: item.Notes0,
        title: item.Title,
        briefId: brief,
        order: item.SortOrder
    };
};
exports.mapAttachments = function (items) { return (items || []).map(exports.mapAttachment); };
exports.mapRecommendation = function (item) {
    var brief = sharepoint_1.idFromLookup(item.Brief);
    var subPolicy = sharepoint_1.idFromLookup(item.SubPolicy);
    var policy = sharepoint_1.idFromLookup(item.Policy);
    return {
        id: item.ID,
        title: item.Title,
        recommendation: item.Recommendation,
        order: item.SortOrder,
        outcome1: item.Outcome1,
        outcome2: item.Outcome2,
        outcome3: item.Outcome3,
        colour: item.Colour,
        brief: brief,
        subPolicy: subPolicy,
        policy: policy
    };
};
exports.mapRecommendations = function (items) {
    return (items || []).map(exports.mapRecommendation);
};
exports.mapLookup = function (item) { return ({
    id: item.ID,
    title: item.Title,
    order: item.SortOrder
}); };
exports.mapLookups = function (items) { return (items || []).map(exports.mapLookup); };
var BriefEffects = /** @class */ (function () {
    function BriefEffects(actions$, sharepoint) {
        var _this = this;
        this.actions$ = actions$;
        this.sharepoint = sharepoint;
        this.loadBriefs$ = this.actions$.pipe(effects_1.ofType(brief_actions_1.BriefActionTypes.LoadBrief), 
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        operators_1.concatMap(function () { return rxjs_1.EMPTY; }));
        this.setActiveBrief$ = this.actions$.pipe(effects_1.ofType(brief_actions_1.BriefActionTypes.SetActiveBrief), operators_1.map(function (action) { return action; }), operators_1.concatMap(function (action) { return _this.getActiveBrief(action.payload.activeBriefId); }), operators_1.switchMap(function (result) { return [
            new brief_actions_1.LoadBrief({
                data: result.data,
                loading: result.loading
            })
        ]; }), operators_1.catchError(function (error) { return rxjs_1.of(new brief_actions_1.GetActiveBriefFailure(error)); }));
    }
    BriefEffects.prototype.getActiveBrief = function (briefId) {
        var viewXml = caml_1.byIdQuery({ id: briefId });
        var briefIdViewXml = caml_1.byBriefIdQuery({ id: briefId });
        return rxjs_1.forkJoin([
            this.sharepoint.getItems({
                listName: 'Brief',
                viewXml: viewXml
            }),
            this.sharepoint.getItems({
                listName: 'RecommendedDirection',
                viewXml: briefIdViewXml
            }),
            this.sharepoint.getItems({
                listName: 'Recommendation',
                viewXml: briefIdViewXml
            }),
            this.sharepoint.getItems({
                listName: 'BriefAttachments',
                viewXml: briefIdViewXml
            }),
            this.sharepoint.getItems({
                listName: 'BriefStatus'
            }),
            this.sharepoint.getItems({
                listName: 'BriefDivision'
            })
        ]).pipe(operators_1.concatMap(function (_a) {
            var spBrief = _a[0], spRecommendedDirection = _a[1], spRecommendations = _a[2], spBriefAttachments = _a[3], spBriefStatus = _a[4], spBriefDivision = _a[5];
            var data = {
                brief: exports.mapBrief(spBrief[0]),
                directions: exports.recommendedDirections(spRecommendedDirection),
                recommendations: exports.mapRecommendations(spRecommendations),
                attachments: exports.mapAttachments(spBriefAttachments),
                statusLookups: exports.mapLookups(spBriefStatus),
                divisionLookups: exports.mapLookups(spBriefDivision),
            };
            // tslint:disable-next-line:no-console
            console.log("\uD83D\uDE48 - brief", data);
            return rxjs_1.of({
                data: data,
                loading: false
            });
        }));
    };
    tslib_1.__decorate([
        effects_1.Effect(),
        tslib_1.__metadata("design:type", Object)
    ], BriefEffects.prototype, "loadBriefs$", void 0);
    tslib_1.__decorate([
        effects_1.Effect(),
        tslib_1.__metadata("design:type", Object)
    ], BriefEffects.prototype, "setActiveBrief$", void 0);
    BriefEffects = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
            sharepoint_1.SharepointJsomService])
    ], BriefEffects);
    return BriefEffects;
}());
exports.BriefEffects = BriefEffects;


/***/ }),

/***/ "./src/app/reducers/brief/brief.reducer.ts":
/*!*************************************************!*\
  !*** ./src/app/reducers/brief/brief.reducer.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var brief_actions_1 = __webpack_require__(/*! ./brief.actions */ "./src/app/reducers/brief/brief.actions.ts");
var store_1 = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm5/store.js");
exports.initialState = {
    activeBrief: null,
    brief: null,
    directions: null,
    recommendations: null,
    attachments: null,
    statusLookups: null,
    divisionLookups: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case brief_actions_1.BriefActionTypes.LoadBrief:
            var data = action.payload.data;
            return tslib_1.__assign({}, state, data);
        case brief_actions_1.BriefActionTypes.SetActiveBrief:
            return tslib_1.__assign({}, state, { activeBrief: action.payload.activeBriefId });
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.briefState = store_1.createFeatureSelector('brief');
exports.selectActiveBriefState = store_1.createSelector(exports.briefState, function (state) { return state.activeBrief; });
exports.selectBriefState = store_1.createSelector(exports.briefState, function (state) { return state.brief; });
exports.selectFileLeafRefState = store_1.createSelector(exports.selectBriefState, function (brief) { return (brief || {}).fileLeafRef; });
exports.selectDirectionsState = store_1.createSelector(exports.briefState, function (state) { return state.directions; });
exports.selectRecommendationsState = store_1.createSelector(exports.briefState, function (state) { return state.recommendations; });
exports.selectAttachmentsState = store_1.createSelector(exports.briefState, function (state) { return state.attachments; });
exports.selectStatusLookupsState = store_1.createSelector(exports.briefState, function (state) { return state.statusLookups; });
exports.selectDivisionLookupsState = store_1.createSelector(exports.briefState, function (state) { return state.divisionLookups; });


/***/ }),

/***/ "./src/app/reducers/discussion/discussion.actions.ts":
/*!***********************************************************!*\
  !*** ./src/app/reducers/discussion/discussion.actions.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DiscussionActionTypes;
(function (DiscussionActionTypes) {
    DiscussionActionTypes["GetDiscussion"] = "[Discussion] Get Discussion";
    DiscussionActionTypes["GetDiscussionFailure"] = "[Navigation] Get Discussion Failure";
    DiscussionActionTypes["LoadDiscussions"] = "[Discussion] Load Discussions";
    DiscussionActionTypes["AddComment"] = "[Discussion] Add Comment";
    DiscussionActionTypes["ReplyToComment"] = "[Discussion] Reply To Comment";
    DiscussionActionTypes["RemoveComment"] = "[Discussion] Remove Comment";
})(DiscussionActionTypes = exports.DiscussionActionTypes || (exports.DiscussionActionTypes = {}));
var LoadDiscussions = /** @class */ (function () {
    function LoadDiscussions(payload) {
        this.payload = payload;
        this.type = DiscussionActionTypes.LoadDiscussions;
    }
    return LoadDiscussions;
}());
exports.LoadDiscussions = LoadDiscussions;
var GetDiscussion = /** @class */ (function () {
    function GetDiscussion(payload) {
        this.payload = payload;
        this.type = DiscussionActionTypes.GetDiscussion;
    }
    return GetDiscussion;
}());
exports.GetDiscussion = GetDiscussion;
var GetDiscussionFailure = /** @class */ (function () {
    function GetDiscussionFailure(payload) {
        this.payload = payload;
        this.type = DiscussionActionTypes.GetDiscussionFailure;
    }
    return GetDiscussionFailure;
}());
exports.GetDiscussionFailure = GetDiscussionFailure;
var AddComment = /** @class */ (function () {
    function AddComment(payload) {
        this.payload = payload;
        this.type = DiscussionActionTypes.AddComment;
    }
    return AddComment;
}());
exports.AddComment = AddComment;
var ReplyToComment = /** @class */ (function () {
    function ReplyToComment(payload) {
        this.payload = payload;
        this.type = DiscussionActionTypes.ReplyToComment;
    }
    return ReplyToComment;
}());
exports.ReplyToComment = ReplyToComment;
var RemoveComment = /** @class */ (function () {
    function RemoveComment(payload) {
        this.payload = payload;
        this.type = DiscussionActionTypes.RemoveComment;
    }
    return RemoveComment;
}());
exports.RemoveComment = RemoveComment;


/***/ }),

/***/ "./src/app/reducers/discussion/discussion.effects.ts":
/*!***********************************************************!*\
  !*** ./src/app/reducers/discussion/discussion.effects.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var effects_1 = __webpack_require__(/*! @ngrx/effects */ "../../node_modules/@ngrx/effects/fesm5/effects.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var discussion_actions_1 = __webpack_require__(/*! ./discussion.actions */ "./src/app/reducers/discussion/discussion.actions.ts");
var sharepoint_1 = __webpack_require__(/*! @df/sharepoint */ "../../node_modules/@df/sharepoint/fesm5/df-sharepoint.js");
var colour_1 = __webpack_require__(/*! ../../utils/colour */ "./src/app/utils/colour.ts");
var caml_1 = __webpack_require__(/*! ../../services/sharepoint/caml */ "./src/app/services/sharepoint/caml.ts");
exports.mapComment = function (item) {
    var brief = sharepoint_1.idFromLookup(item.Brief);
    var parent = sharepoint_1.idFromLookup(item.Parent);
    var user = sharepoint_1.fromUser(item.Author);
    var author = tslib_1.__assign({}, user, { color: colour_1.pickColor(user.email) });
    return {
        id: item.ID,
        title: item.Title,
        created: item.Created,
        text: item.Comments,
        brief: brief,
        parent: parent,
        author: author
    };
};
exports.mapComments = function (items) { return (items || []).map(exports.mapComment); };
var DiscussionEffects = /** @class */ (function () {
    function DiscussionEffects(actions$, sharepoint) {
        var _this = this;
        this.actions$ = actions$;
        this.sharepoint = sharepoint;
        // return sharePointService.removeItem(
        //   'Comment', commentId				
        // );
        this.loadDiscussions$ = this.actions$.pipe(effects_1.ofType(discussion_actions_1.DiscussionActionTypes.GetDiscussion), operators_1.map(function (action) { return action; }), operators_1.concatMap(function (action) { return _this.getDiscussionNodes(action.payload.activeBriefId); }), 
        // tslint:disable-next-line: no-console
        operators_1.tap(function (result) { return console.log("\uD83C\uDF7A ", result); }), operators_1.switchMap(function (result) { return [
            new discussion_actions_1.LoadDiscussions({
                data: result.data.nodes,
                loading: result.loading
            })
        ]; }), operators_1.catchError(function (error) { return rxjs_1.of(new discussion_actions_1.GetDiscussionFailure(error)); }));
        this.addComment$ = this.actions$.pipe(effects_1.ofType(discussion_actions_1.DiscussionActionTypes.AddComment), operators_1.map(function (action) { return action; }), operators_1.concatMap(function (action) { return _this.addComment(action.payload); }), 
        // tslint:disable-next-line: no-console
        operators_1.tap(function (result) { return console.log("\uD83C\uDF7A ", result); }), operators_1.switchMap(function (result) { return [
            new discussion_actions_1.GetDiscussion({
                activeBriefId: result.brief
            })
        ]; }), operators_1.catchError(function (error) { return rxjs_1.of(new discussion_actions_1.GetDiscussionFailure(error)); }));
        this.removeComment$ = this.actions$.pipe(effects_1.ofType(discussion_actions_1.DiscussionActionTypes.RemoveComment), operators_1.map(function (action) { return action; }), operators_1.concatMap(function (action) { return _this.removeComment(action.payload); }), 
        // tslint:disable-next-line: no-console
        operators_1.tap(function (result) { return console.log("\uD83C\uDF7A ", result); }), operators_1.switchMap(function (result) { return [
            new discussion_actions_1.GetDiscussion({
                activeBriefId: result.brief
            })
        ]; }), operators_1.catchError(function (error) { return rxjs_1.of(new discussion_actions_1.GetDiscussionFailure(error)); }));
    }
    // 💬
    DiscussionEffects.prototype.getDiscussionNodes = function (briefId) {
        var briefIdViewXml = caml_1.byBriefIdQuery({ id: briefId });
        return rxjs_1.forkJoin([
            this.sharepoint.getItems({
                listName: 'Comment',
                viewXml: briefIdViewXml
            })
        ]).pipe(operators_1.map(function (_a) {
            var spComments = _a[0];
            return exports.mapComments(spComments).slice();
        }), operators_1.concatMap(function (result) {
            return rxjs_1.of({
                data: { nodes: result },
                loading: false
            });
        }));
    };
    DiscussionEffects.prototype.addComment = function (comment) {
        return this.sharepoint.storeItem({
            listName: 'Comment',
            data: {
                Comments: comment.text,
                Brief: comment.brief,
                Parent: comment.parent
            }
        })
            .pipe(operators_1.concatMap(function (_) { return rxjs_1.of({ brief: comment.brief }); }));
    };
    DiscussionEffects.prototype.removeComment = function (comment) {
        return this.sharepoint.removeItem({
            listName: 'Comment',
            id: comment.id
        })
            .pipe(operators_1.concatMap(function (_) { return rxjs_1.of({ brief: comment.brief }); }));
    };
    tslib_1.__decorate([
        effects_1.Effect(),
        tslib_1.__metadata("design:type", Object)
    ], DiscussionEffects.prototype, "loadDiscussions$", void 0);
    tslib_1.__decorate([
        effects_1.Effect(),
        tslib_1.__metadata("design:type", Object)
    ], DiscussionEffects.prototype, "addComment$", void 0);
    tslib_1.__decorate([
        effects_1.Effect(),
        tslib_1.__metadata("design:type", Object)
    ], DiscussionEffects.prototype, "removeComment$", void 0);
    DiscussionEffects = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
            sharepoint_1.SharepointJsomService])
    ], DiscussionEffects);
    return DiscussionEffects;
}());
exports.DiscussionEffects = DiscussionEffects;


/***/ }),

/***/ "./src/app/reducers/discussion/discussion.reducer.ts":
/*!***********************************************************!*\
  !*** ./src/app/reducers/discussion/discussion.reducer.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var discussion_actions_1 = __webpack_require__(/*! ./discussion.actions */ "./src/app/reducers/discussion/discussion.actions.ts");
var store_1 = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm5/store.js");
var utils_1 = __webpack_require__(/*! @df/utils */ "../../node_modules/@df/utils/fesm5/df-utils.js");
exports.initialState = {
    timeFormat: 'dateFormat',
    activeComment: null,
    comments: null,
    discussion: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case discussion_actions_1.DiscussionActionTypes.ReplyToComment:
            var activeComment = action.payload.activeComment;
            // tslint:disable-next-line: no-console
            console.log("\uD83D\uDC79 ", action.payload, activeComment);
            if (activeComment === state.activeComment) {
                activeComment = null;
            }
            return tslib_1.__assign({}, state, { activeComment: activeComment });
        case discussion_actions_1.DiscussionActionTypes.LoadDiscussions:
            var data = action.payload.data;
            var discussionNodes = JSON.parse(JSON.stringify(data || [])).sort(utils_1.sortBy('order'));
            var discussion = utils_1.toTree(discussionNodes, {
                id: 'id',
                parentId: 'parent',
                children: 'children',
                level: 'level'
            });
            return tslib_1.__assign({}, state, { discussion: discussion });
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.discussionState = store_1.createFeatureSelector('discussion');
exports.selectActiveCommentState = store_1.createSelector(exports.discussionState, function (state) { return state.activeComment; });
exports.selectTimeFormatState = store_1.createSelector(exports.discussionState, function (state) { return state.timeFormat; });
exports.selectCommentsState = store_1.createSelector(exports.discussionState, function (state) { return state.comments; });
exports.selectDiscussionState = store_1.createSelector(exports.discussionState, function (state) { return state.discussion; });


/***/ }),

/***/ "./src/app/reducers/index.ts":
/*!***********************************!*\
  !*** ./src/app/reducers/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var fromRouter = __webpack_require__(/*! @ngrx/router-store */ "../../node_modules/@ngrx/router-store/fesm5/router-store.js");
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
var ngrx_store_freeze_1 = __webpack_require__(/*! ngrx-store-freeze */ "../../node_modules/ngrx-store-freeze/index.js");
var ngrx_store_localstorage_1 = __webpack_require__(/*! ngrx-store-localstorage */ "../../node_modules/ngrx-store-localstorage/dist/index.js");
function localStorageSyncReducer(reducer) {
    return ngrx_store_localstorage_1.localStorageSync({
        keys: [{ auth: ['status'] }, { user: ['drawerOpen'] }, { navigation: ['expandedNodes'] }],
        rehydrate: true
    })(reducer);
}
exports.localStorageSyncReducer = localStorageSyncReducer;
// console.log all actions
function logger(reducer) {
    return reducer;
}
exports.logger = logger;
exports.reducers = {
    routerReducer: fromRouter.routerReducer
};
var CustomSerializer = /** @class */ (function () {
    function CustomSerializer() {
    }
    CustomSerializer.prototype.serialize = function (routerState) {
        var url = routerState.url;
        var queryParams = routerState.root.queryParams;
        var state = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        var params = state.params;
        return { url: url, queryParams: queryParams, params: params };
    };
    return CustomSerializer;
}());
exports.CustomSerializer = CustomSerializer;
exports.metaReducers = !environment_1.environment.production
    ? [logger, localStorageSyncReducer, ngrx_store_freeze_1.storeFreeze]
    : [localStorageSyncReducer];


/***/ }),

/***/ "./src/app/reducers/navigation/navigation.actions.ts":
/*!***********************************************************!*\
  !*** ./src/app/reducers/navigation/navigation.actions.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NavigationActionTypes;
(function (NavigationActionTypes) {
    NavigationActionTypes["GetNavigations"] = "[Navigation] Get Navigations";
    NavigationActionTypes["GetNavigationsFailure"] = "[Navigation] Get Navigations Failure";
    NavigationActionTypes["LoadNavigations"] = "[Navigation] Load Navigations";
    NavigationActionTypes["ToggleExpand"] = "[Navigation] Toggle Expand";
})(NavigationActionTypes = exports.NavigationActionTypes || (exports.NavigationActionTypes = {}));
var GetNavigations = /** @class */ (function () {
    function GetNavigations() {
        this.type = NavigationActionTypes.GetNavigations;
    }
    return GetNavigations;
}());
exports.GetNavigations = GetNavigations;
var ToggleExpand = /** @class */ (function () {
    function ToggleExpand(payload) {
        this.payload = payload;
        this.type = NavigationActionTypes.ToggleExpand;
    }
    return ToggleExpand;
}());
exports.ToggleExpand = ToggleExpand;
var GetNavigationsFailure = /** @class */ (function () {
    function GetNavigationsFailure(payload) {
        this.payload = payload;
        this.type = NavigationActionTypes.GetNavigationsFailure;
    }
    return GetNavigationsFailure;
}());
exports.GetNavigationsFailure = GetNavigationsFailure;
var LoadNavigations = /** @class */ (function () {
    function LoadNavigations(payload) {
        this.payload = payload;
        this.type = NavigationActionTypes.LoadNavigations;
    }
    return LoadNavigations;
}());
exports.LoadNavigations = LoadNavigations;


/***/ }),

/***/ "./src/app/reducers/navigation/navigation.effects.ts":
/*!***********************************************************!*\
  !*** ./src/app/reducers/navigation/navigation.effects.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var effects_1 = __webpack_require__(/*! @ngrx/effects */ "../../node_modules/@ngrx/effects/fesm5/effects.js");
var sharepoint_1 = __webpack_require__(/*! @df/sharepoint */ "../../node_modules/@df/sharepoint/fesm5/df-sharepoint.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var navigation_actions_1 = __webpack_require__(/*! ./navigation.actions */ "./src/app/reducers/navigation/navigation.actions.ts");
var utils_1 = __webpack_require__(/*! @df/utils */ "../../node_modules/@df/utils/fesm5/df-utils.js");
exports.mapNavigationNode = function (item) {
    var policy = sharepoint_1.idFromLookup(item.Policy);
    var subpolicy = sharepoint_1.idFromLookup(item.SubPolicy);
    var nodeId = item.ID;
    var parent = null;
    if (policy) {
        nodeId = [policy, item.ID].filter(function (p) { return !!p; }).join('-');
        parent = "" + policy;
    }
    if (subpolicy) {
        nodeId = [policy, subpolicy, item.ID].filter(function (p) { return !!p; }).join('-');
        parent = [policy, subpolicy].filter(function (p) { return !!p; }).join('-');
    }
    return {
        id: nodeId,
        briefId: item.ID,
        caption: item.Title,
        parent: parent,
        colour: item.Colour,
        order: item.SortOrder,
        active: false,
        expanded: false
    };
};
exports.mapNavigationNodes = function (items) { return items.map(exports.mapNavigationNode); };
var NavigationEffects = /** @class */ (function () {
    function NavigationEffects(actions$, sharepoint) {
        var _this = this;
        this.actions$ = actions$;
        this.sharepoint = sharepoint;
        this.getNavigations$ = this.actions$.pipe(effects_1.ofType(navigation_actions_1.NavigationActionTypes.GetNavigations), operators_1.map(function (action) { return action; }), operators_1.concatMap(function (_) { return _this.getPackNavigationNodes(); }), operators_1.switchMap(function (result) { return [
            new navigation_actions_1.LoadNavigations({
                nodes: result.data.nodes,
                loading: result.loading
            })
        ]; }), operators_1.catchError(function (error) { return rxjs_1.of(new navigation_actions_1.GetNavigationsFailure(error)); }));
    }
    NavigationEffects.prototype.getPackNavigationNodes = function () {
        return rxjs_1.forkJoin([
            this.sharepoint.getItems({
                listName: 'Policy'
            }),
            this.sharepoint.getItems({
                listName: 'SubPolicy'
            }),
            this.sharepoint.getItems({
                listName: 'Brief'
            })
        ]).pipe(operators_1.map(function (_a) {
            var spPolicy = _a[0], spSubPolicy = _a[1], spBrief = _a[2];
            return exports.mapNavigationNodes(spPolicy).concat(exports.mapNavigationNodes(spSubPolicy), exports.mapNavigationNodes(spBrief));
        }), operators_1.map(function (nodes) {
            // this relies on the order of nodes i.e policy then subpolicy then brief
            var nodesHash = utils_1.arrayToHash(nodes);
            var colourised = nodes.reduce(function (acc, item, index, array) {
                if (!item.colour) {
                    item.colour = nodesHash[item.parent].colour;
                }
                acc.push(item);
                return acc;
            }, []);
            return colourised;
        }), operators_1.concatMap(function (result) {
            return rxjs_1.of({
                data: { nodes: result },
                loading: false
            });
        }));
    };
    tslib_1.__decorate([
        effects_1.Effect(),
        tslib_1.__metadata("design:type", Object)
    ], NavigationEffects.prototype, "getNavigations$", void 0);
    NavigationEffects = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
            sharepoint_1.SharepointJsomService])
    ], NavigationEffects);
    return NavigationEffects;
}());
exports.NavigationEffects = NavigationEffects;


/***/ }),

/***/ "./src/app/reducers/navigation/navigation.reducer.ts":
/*!***********************************************************!*\
  !*** ./src/app/reducers/navigation/navigation.reducer.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var navigation_actions_1 = __webpack_require__(/*! ./navigation.actions */ "./src/app/reducers/navigation/navigation.actions.ts");
var store_1 = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm5/store.js");
var utils_1 = __webpack_require__(/*! @df/utils */ "../../node_modules/@df/utils/fesm5/df-utils.js");
exports.initialState = {
    navigationNodes: null,
    navigationTree: null,
    expandedNodes: []
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case navigation_actions_1.NavigationActionTypes.ToggleExpand:
            var expandedNodes = state.expandedNodes.filter(function (n) { return n !== action.payload.id; });
            if (action.payload.expanded) {
                expandedNodes.push(action.payload.id);
            }
            return tslib_1.__assign({}, state, { expandedNodes: expandedNodes });
        case navigation_actions_1.NavigationActionTypes.LoadNavigations:
            return tslib_1.__assign({}, state, { navigationNodes: action.payload.nodes });
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.navigationState = store_1.createFeatureSelector('navigation');
exports.selectNavigationNodeState = store_1.createSelector(exports.navigationState, function (state) { return state.navigationNodes; });
exports.selectExpandedNavigationNodeState = store_1.createSelector(exports.navigationState, function (state) { return state.expandedNodes; });
exports.selectNavigationNodeTreeState = store_1.createSelector(exports.selectNavigationNodeState, exports.selectExpandedNavigationNodeState, function (nodes, expanded) {
    var sortedNodes = (nodes || [])
        .map(function (p) { return (tslib_1.__assign({}, p, { expanded: expanded.includes(p.id) })); })
        .sort(utils_1.sortBy('order'));
    var tree = utils_1.toTree(sortedNodes, {
        id: 'id',
        parentId: 'parent',
        children: 'children',
        level: 'level'
    });
    // tslint:disable-next-line:no-console
    console.log("\uD83D\uDC19 -  selectNavigationNodeTreeState", sortedNodes, tree);
    return tree;
});


/***/ }),

/***/ "./src/app/reducers/user/user.actions.ts":
/*!***********************************************!*\
  !*** ./src/app/reducers/user/user.actions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserActionTypes;
(function (UserActionTypes) {
    UserActionTypes["SetCurrentUser"] = "[User] Set Current User";
    UserActionTypes["GetUserOperations"] = "[User] Get User Operations";
    UserActionTypes["SetUserOperations"] = "[User] Set User Operations";
})(UserActionTypes = exports.UserActionTypes || (exports.UserActionTypes = {}));
var SetCurrentUser = /** @class */ (function () {
    function SetCurrentUser(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SetCurrentUser;
    }
    return SetCurrentUser;
}());
exports.SetCurrentUser = SetCurrentUser;
var GetUserOperations = /** @class */ (function () {
    function GetUserOperations(payload) {
        this.payload = payload;
        this.type = UserActionTypes.GetUserOperations;
    }
    return GetUserOperations;
}());
exports.GetUserOperations = GetUserOperations;
var SetUserOperations = /** @class */ (function () {
    function SetUserOperations(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SetUserOperations;
    }
    return SetUserOperations;
}());
exports.SetUserOperations = SetUserOperations;


/***/ }),

/***/ "./src/app/reducers/user/user.reducer.ts":
/*!***********************************************!*\
  !*** ./src/app/reducers/user/user.reducer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var user_actions_1 = __webpack_require__(/*! ./user.actions */ "./src/app/reducers/user/user.actions.ts");
var app_actions_1 = __webpack_require__(/*! ../app.actions */ "./src/app/reducers/app.actions.ts");
exports.initialState = {
    currentUser: null,
    drawerOpen: false,
    operations: {}
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case user_actions_1.UserActionTypes.SetCurrentUser: {
            return tslib_1.__assign({}, state, { currentUser: action.payload });
        }
        case app_actions_1.AppActionTypes.SetLayoutDrawState: {
            return tslib_1.__assign({}, state, { drawerOpen: action.state });
        }
        case user_actions_1.UserActionTypes.SetUserOperations: {
            var ops = {};
            if (action.payload.data && action.payload.data.groupPermissions) {
                ops = action.payload.data.groupPermissions.reduce(function (acc, item) {
                    var components = item.component;
                    acc[item.group] = tslib_1.__assign({}, (components || []).reduce(function (componentRights, component) {
                        componentRights[component] = item.rights;
                        return componentRights;
                    }, acc[item.group] || {}));
                    return acc;
                }, {});
            }
            return tslib_1.__assign({}, state, { operations: tslib_1.__assign({}, ops) });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.getOperations = function (state) { return state.operations; };
exports.getCurrentUser = function (state) { return state.currentUser; };
exports.getDrawerOpen = function (state) { return state.drawerOpen; };


/***/ }),

/***/ "./src/app/services/app-data.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/app-data.service.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var AppDataService = /** @class */ (function () {
    function AppDataService() {
    }
    AppDataService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppDataService);
    return AppDataService;
}());
exports.AppDataService = AppDataService;


/***/ }),

/***/ "./src/app/services/config.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/config.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var environment_prod_1 = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
var defaults = {
    'header': {
        'title': 'Deck',
        'classification': 'UNCLASSIFIED',
        'logo': {
            'image': 'assets/crest.png',
            'url': '/'
        },
        'apps': []
    }
};
var AppConfigService = /** @class */ (function () {
    function AppConfigService(http) {
        var _this = this;
        this.http = http;
        this._jsonURL = environment_prod_1.environment.config;
        this._config = new rxjs_1.BehaviorSubject(defaults);
        this.getJSON().subscribe(function (data) {
            _this._config.next(data);
            // tslint:disable-next-line:no-console
            console.log(data);
        });
    }
    AppConfigService.prototype.getJSON = function () {
        return this.http.get(this._jsonURL);
    };
    Object.defineProperty(AppConfigService.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    AppConfigService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], AppConfigService);
    return AppConfigService;
}());
exports.AppConfigService = AppConfigService;


/***/ }),

/***/ "./src/app/services/policy-briefs-data.service.ts":
/*!********************************************************!*\
  !*** ./src/app/services/policy-briefs-data.service.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var PolicyBriefsDataService = /** @class */ (function () {
    function PolicyBriefsDataService() {
        this._appdrawerOpen = new rxjs_1.BehaviorSubject(true);
    }
    PolicyBriefsDataService.prototype.getCurrentUser = function () {
        return rxjs_1.of();
    };
    PolicyBriefsDataService.prototype.getCurrentUserOperations = function (roles) {
        return rxjs_1.of();
    };
    PolicyBriefsDataService.prototype.getBusy = function () {
        return rxjs_1.of(false);
    };
    Object.defineProperty(PolicyBriefsDataService.prototype, "Notification", {
        get: function () {
            return rxjs_1.of();
        },
        enumerable: true,
        configurable: true
    });
    PolicyBriefsDataService.prototype.getDrawState = function () {
        return this._appdrawerOpen.asObservable();
    };
    PolicyBriefsDataService.prototype.setDrawState = function (appdrawerOpen) {
        this._appdrawerOpen.next(appdrawerOpen);
    };
    PolicyBriefsDataService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PolicyBriefsDataService);
    return PolicyBriefsDataService;
}());
exports.PolicyBriefsDataService = PolicyBriefsDataService;


/***/ }),

/***/ "./src/app/services/sharepoint/caml.ts":
/*!*********************************************!*\
  !*** ./src/app/services/sharepoint/caml.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.byIdQuery = function (criteria) {
    return "<View>\n  <Query>\n      <Where>\n      <Eq>\n          <FieldRef Name='ID' />\n          <Value Type='Number'>" + criteria.id + "</Value>\n      </Eq>\n      </Where>\n  </Query>\n</View>";
};
exports.byIdsQuery = function (criteria) {
    if (criteria.length === 0) {
        return null;
    }
    var set = criteria.map(function (id) { return "<Eq><FieldRef Name='ID' /><Value Type='Number'>" + id + "</Value></Eq>"; });
    var orDSet = set.reduce(function (acc, item) {
        var last = acc.pop();
        if (last) {
            last = "<Or>" + item + last + "</Or>";
        }
        else {
            last = item;
        }
        acc.push(last);
        return acc;
    }, [])[0];
    return "<View><Query><Where>" + orDSet + "</Where></Query></View>";
};
exports.byBriefIdQuery = function (criteria) { return "\n<View>\n  <Query>\n      <Where>\n      <Eq>\n          <FieldRef Name='Brief' LookupId='True' />\n          <Value Type='Lookup'>" + criteria.id + "</Value>\n      </Eq>\n      </Where>\n  </Query>\n</View>"; };
exports.byJoinTableQuery = function (criteria) { return "\n<View>\n<Query>\n  <Where>\n    <And>\n        <Eq>\n          <FieldRef Name='" + criteria.fieldA.name + "' LookupId='True'/>\n          <Value Type='Lookup'>" + criteria.fieldA.id + "</Value>\n        </Eq>\n        <Eq>\n          <FieldRef Name='" + criteria.fieldB.name + "' LookupId='True'/>\n          <Value Type='Lookup'>" + criteria.fieldB.id + "</Value>\n        </Eq>\n    </And>\n  </Where>\n</Query>\n</View>"; };


/***/ }),

/***/ "./src/app/utils/colour.ts":
/*!*********************************!*\
  !*** ./src/app/utils/colour.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hashCode = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
};
exports.pickColor = function (str) {
    return "hsl(" + exports.hashCode(str) % 360 + ", 100%, 80%)";
};


/***/ }),

/***/ "./src/environments/environment.prod.ts":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: true,
    version: __webpack_require__(/*! ../../../../package.json */ "../../package.json").version,
    config: 'http://vm-dev-lbs13/sites/redigb/SiteAssets/apps/policy-briefs/assets/policy_briefs_config.txt',
    datasources: {
        default: {
            type: 'sharepoint',
            dataServiceUrl: 'http://vm-dev-lbs13/sites/redigb/_api/Web/'
        }
    }
};


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false,
    version: __webpack_require__(/*! ../../../../package.json */ "../../package.json").version,
    config: 'http://vm-dev-lbs13/sites/redigb/SiteAssets/apps/policy-briefs/assets/policy_briefs_config.txt',
    datasources: {
        default: {
            type: 'sharepoint',
            dataServiceUrl: 'http://vm-dev-lbs13/sites/redigb/_api/Web/'
        }
    }
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
var environment_1 = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic()
    .bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\ajkitson\repos\DF-Client\digital-first\apps\policy-briefs\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map