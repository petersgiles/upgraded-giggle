(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../libs/df-components/src/index.ts":
/*!*************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/index.ts ***!
  \*************************************************************************************/
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
/*!*************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/avatar/avatar.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"avatar\"\r\n     *ngIf=\"props\"\r\n     [style.background-color]=\"props.background\"\r\n     [style.width]=\"props.size\"\r\n     [style.line-height]='props.lineheight'\r\n     [style.height]='props.size'\r\n     [style.font-size]='props.fontSize'\r\n     [style.border-radius]='props.borderradius'>\r\n      <span [style.color]='fontColor'>{{letter}}</span>\r\n</div>"

/***/ }),

/***/ "../../libs/df-components/src/lib/avatar/avatar.component.scss":
/*!*************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/avatar/avatar.component.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".avatar {\n  text-align: center;\n  overflow: hidden; }\n  .avatar img {\n    vertical-align: top; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2F2YXRhci9DOlxcVXNlcnNcXGFwZ2lsZXNcXENvZGVcXERGLUNsaWVudFxcZGlnaXRhbC1maXJzdC9saWJzXFxkZi1jb21wb25lbnRzXFxzcmNcXGxpYlxcYXZhdGFyXFxhdmF0YXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBbUI7RUFDbkIsZ0JBQW1CLEVBQUE7RUFGdkI7SUFLTSxtQkFBbUIsRUFBQSIsImZpbGUiOiJsaWJzL2RmLWNvbXBvbmVudHMvc3JjL2xpYi9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmF2YXRhciB7XHJcbiAgICB0ZXh0LWFsaWduIDogY2VudGVyO1xyXG4gICAgb3ZlcmZsb3cgICA6IGhpZGRlbjtcclxuICBcclxuICAgIGltZyB7XHJcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICB9XHJcbiAgfSJdfQ== */"

/***/ }),

/***/ "../../libs/df-components/src/lib/avatar/avatar.component.ts":
/*!***********************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/avatar/avatar.component.ts ***!
  \***********************************************************************************************************/
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
/*!**************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/busy.component.ts ***!
  \**************************************************************************************************/
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
/*!*************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/contact-card/contact-card.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mdc-card class=\"contact-card\">\r\n  <mdc-card-primary-action>\r\n    <div class=\"app-card__primary\">\r\n      <h2 class=\"app-card__title\" mdcHeadline6>{{contact?.name}}</h2>\r\n      <h3 class=\"app-card__subtitle\" mdcSubtitle2>{{contact?.portfolio?.title | truncate:40}}</h3>\r\n    </div>\r\n    <div class=\"app-card__secondary\" mdcBody2>\r\n      <mdc-list twoLine dense>\r\n        <mdc-list-item>\r\n          <mdc-icon mdcListItemGraphic>phone</mdc-icon>\r\n          <mdc-list-item-text secondaryText=\"work\">{{contact?.phone}}</mdc-list-item-text>\r\n        </mdc-list-item>\r\n        <mdc-list-item (click)=\"onMailClicked.emit(contact)\">\r\n          <mdc-icon mdcListItemGraphic>alternate_email</mdc-icon>\r\n          <mdc-list-item-text secondaryText=\"work\">{{contact?.email}}</mdc-list-item-text>\r\n        </mdc-list-item>\r\n      </mdc-list>\r\n    </div>\r\n  </mdc-card-primary-action>\r\n</mdc-card>"

/***/ }),

/***/ "../../libs/df-components/src/lib/contact-card/contact-card.component.scss":
/*!*************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/contact-card/contact-card.component.scss ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".contact-card {\n  margin: 8px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2NvbnRhY3QtY2FyZC9DOlxcVXNlcnNcXGFwZ2lsZXNcXENvZGVcXERGLUNsaWVudFxcZGlnaXRhbC1maXJzdC9saWJzXFxkZi1jb21wb25lbnRzXFxzcmNcXGxpYlxcY29udGFjdC1jYXJkXFxjb250YWN0LWNhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFXLEVBQUEiLCJmaWxlIjoibGlicy9kZi1jb21wb25lbnRzL3NyYy9saWIvY29udGFjdC1jYXJkL2NvbnRhY3QtY2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWN0LWNhcmQgeyBcclxuICAgIG1hcmdpbjogOHB4O1xyXG59Il19 */"

/***/ }),

/***/ "../../libs/df-components/src/lib/contact-card/contact-card.component.ts":
/*!***********************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/contact-card/contact-card.component.ts ***!
  \***********************************************************************************************************************/
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
/*!********************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/df-components.module.ts ***!
  \********************************************************************************************************/
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
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/electorate-selector/electorate-selector.component.html ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-content\">\r\n  <div class=\"form-layout__row--no-wrap form-layout__row-with-button\">\r\n    <ng-select [items]=\"_electorates\" bindValue=\"id\" bindLabel=\"title\" placeholder=\"Select Electorate\" [formControl]=\"selectControl\">\r\n    </ng-select>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n\r\n<div class=\"app-layout__row\">\r\n  <mdc-chip-set input>\r\n    <mdc-chip *ngFor=\"let electorate of selected\" [label]=\"electorate.title\" (removed)=\"handleRemove(electorate)\">\r\n      <mdc-chip-icon trailing>cancel</mdc-chip-icon>\r\n    </mdc-chip>\r\n  </mdc-chip-set>\r\n</div>"

/***/ }),

/***/ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.scss":
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/electorate-selector/electorate-selector.component.scss ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .mdc-select {\n  width: 100%;\n  width: -webkit-fill-available; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2VsZWN0b3JhdGUtc2VsZWN0b3IvQzpcXFVzZXJzXFxhcGdpbGVzXFxDb2RlXFxERi1DbGllbnRcXGRpZ2l0YWwtZmlyc3QvbGlic1xcZGYtY29tcG9uZW50c1xcc3JjXFxsaWJcXGVsZWN0b3JhdGUtc2VsZWN0b3JcXGVsZWN0b3JhdGUtc2VsZWN0b3IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxXQUFVO0VBQ1YsNkJBQTZCLEVBQUEiLCJmaWxlIjoibGlicy9kZi1jb21wb25lbnRzL3NyYy9saWIvZWxlY3RvcmF0ZS1zZWxlY3Rvci9lbGVjdG9yYXRlLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gICAgLm1kYy1zZWxlY3Qge1xyXG4gICAgICAgIHdpZHRoOjEwMCU7XHJcbiAgICAgICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XHJcbiAgICB9XHJcbn1cclxuICAiXX0= */"

/***/ }),

/***/ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.ts":
/*!*************************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/electorate-selector/electorate-selector.component.ts ***!
  \*************************************************************************************************************************************/
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
/*!*************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/electorate-selector/index.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./electorate-selector.component */ "../../libs/df-components/src/lib/electorate-selector/electorate-selector.component.ts"), exports);


/***/ }),

/***/ "../../libs/df-components/src/lib/info/info.component.html":
/*!*********************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/info/info.component.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"df-card-info\">\r\n  <div class=\"df-card-info-row\">\r\n    <div class=\"df-card-info-body\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../libs/df-components/src/lib/info/info.component.scss":
/*!*********************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/info/info.component.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".df-card-info {\n  margin: 5px 15px;\n  padding: 5px 15px; }\n\n.df-card-info-row {\n  display: flex; }\n\n.df-card-info-body {\n  font-style: italic;\n  color: lightgrey; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL2luZm8vQzpcXFVzZXJzXFxhcGdpbGVzXFxDb2RlXFxERi1DbGllbnRcXGRpZ2l0YWwtZmlyc3QvbGlic1xcZGYtY29tcG9uZW50c1xcc3JjXFxsaWJcXGluZm9cXGluZm8uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxnQkFBZ0I7RUFDaEIsaUJBQWlCLEVBQUE7O0FBRXJCO0VBQ0ksYUFBYSxFQUFBOztBQUVqQjtFQUNJLGtCQUFrQjtFQUNsQixnQkFBZ0IsRUFBQSIsImZpbGUiOiJsaWJzL2RmLWNvbXBvbmVudHMvc3JjL2xpYi9pbmZvL2luZm8uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmRmLWNhcmQtaW5mbyB7XHJcbiAgICBtYXJnaW46IDVweCAxNXB4O1xyXG4gICAgcGFkZGluZzogNXB4IDE1cHg7XHJcbn1cclxuLmRmLWNhcmQtaW5mby1yb3cge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxufVxyXG4uZGYtY2FyZC1pbmZvLWJvZHkge1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6IGxpZ2h0Z3JleTtcclxufSJdfQ== */"

/***/ }),

/***/ "../../libs/df-components/src/lib/info/info.component.ts":
/*!*******************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/info/info.component.ts ***!
  \*******************************************************************************************************/
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
/*!********************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/page-title.component.ts ***!
  \********************************************************************************************************/
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
/*!***********************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/related-artifacts/related-artifacts.component.html ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mdc-list twoLine dense>\r\n  <mdc-list-item *ngFor=\"let link of links\">\r\n    <mdc-icon mdcListItemGraphic>link</mdc-icon>\r\n    <mdc-list-item-text secondaryText=\"commitment\">Commitment Name</mdc-list-item-text>\r\n    <a mdcListItemMeta mdcIcon aria-label=\"Delete this Item\" title=\"Delete this Item\" (click)=\"onDeleteRelated.emit(link)\">delete_forever</a>\r\n  </mdc-list-item>\r\n</mdc-list>\r\n<button mdc-button (click)=\"onAddRelated.emit()\">\r\n  <mdc-icon>add</mdc-icon>Add Related Artifact\r\n</button>"

/***/ }),

/***/ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.scss":
/*!***********************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/related-artifacts/related-artifacts.component.scss ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  min-width: 50%;\n  width: 100%;\n  width: -webkit-fill-available;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL3JlbGF0ZWQtYXJ0aWZhY3RzL0M6XFxVc2Vyc1xcYXBnaWxlc1xcQ29kZVxcREYtQ2xpZW50XFxkaWdpdGFsLWZpcnN0L2xpYnNcXGRmLWNvbXBvbmVudHNcXHNyY1xcbGliXFxyZWxhdGVkLWFydGlmYWN0c1xccmVsYXRlZC1hcnRpZmFjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFjO0VBQ2QsV0FBVTtFQUNWLDZCQUE2QjtFQUM3QixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLDJCQUEyQixFQUFBIiwiZmlsZSI6ImxpYnMvZGYtY29tcG9uZW50cy9zcmMvbGliL3JlbGF0ZWQtYXJ0aWZhY3RzL3JlbGF0ZWQtYXJ0aWZhY3RzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gICAgbWluLXdpZHRoOiA1MCU7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XHJcbiAgICBkaXNwbGF5OiBmbGV4OyBcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbn0gIl19 */"

/***/ }),

/***/ "../../libs/df-components/src/lib/related-artifacts/related-artifacts.component.ts":
/*!*********************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-components/src/lib/related-artifacts/related-artifacts.component.ts ***!
  \*********************************************************************************************************************************/
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
/*!**********************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/index.ts ***!
  \**********************************************************************************/
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
/*!**************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/df-layouts.module.ts ***!
  \**************************************************************************************************/
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
/*!********************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/full-layout/full-layout.component.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mdc-top-app-bar class=\"app-top-app-bar\" #topAppBar fixed prominent='false'>\r\n    <mdc-top-app-bar-row>\r\n        <mdc-top-app-bar-section align=\"start\" title=\"{{title}}\" >\r\n            <mdc-icon mdcAppBarNavIcon *ngIf=\"isScreenSmall()\" (click)=\"drawOpenToggleClicked(!drawOpen)\">menu</mdc-icon>\r\n            <mdc-icon mdcTopAppBarActionItem [routerLink]=\"['/']\">home</mdc-icon>\r\n        </mdc-top-app-bar-section>\r\n        <mdc-top-app-bar-section align=\"center\"class=\"protective-marking\">\r\n            <span >{{(protectiveMarking$ | async) | uppercase}}</span> \r\n        </mdc-top-app-bar-section>\r\n        <mdc-top-app-bar-section align=\"end\">\r\n            <!-- <a mdcAppBarActionItem href=\"https://github.com/trimox/angular-mdc-web\" alt=\"GitHub\" target=\"_blank\" rel=\"noopener noreferrer\">\r\n            <mdc-icon>\r\n              <img src=\"https://trimox.github.io/angular-mdc-web/assets/github-circle-white-transparent.svg\" height=\"24\" />\r\n            </mdc-icon>\r\n          </a>  -->\r\n            <span class=\"app-layout-title-version\">{{version}}</span>\r\n            <digital-first-avatar [name]=\"profile?.name\" [email]=\"profile?.email\" [displayType]=\"profile?.displayType\"\r\n                [size]=\"profile?.size\" [background]=\"profile?.background\">\r\n            </digital-first-avatar>\r\n            <mdc-icon mdcTopAppBarActionItem (click)=\"profileMenu.open = !profileMenu.open\">more_vert</mdc-icon>\r\n            <div mdcMenuSurfaceAnchor #menuAnchor>\r\n                <mdc-menu #profileMenu [anchorElement]=\"menuAnchor\">\r\n                  <mdc-list>\r\n                    <mdc-list-item *ngFor=\"let item of sidebarItems$ | async\">\r\n                        <a *ngIf=\"!item.divider\" mdc-list-item [routerLink]=\"item.routerLink\" routerLinkActive=\"app-drawer-link-active\">\r\n                            <mdc-icon mdcListItemGraphic>{{item.icon}}</mdc-icon>{{item.caption}}\r\n                        </a>\r\n                    </mdc-list-item>\r\n                  </mdc-list>\r\n                </mdc-menu>\r\n            </div>\r\n        </mdc-top-app-bar-section>\r\n    </mdc-top-app-bar-row>\r\n    <mdc-linear-progress [open]=\"(open$ | async)\"></mdc-linear-progress>\r\n</mdc-top-app-bar>\r\n\r\n\r\n<mdc-drawer #appdrawer=\"mdcDrawer\" [open]=\"drawOpen || !isScreenSmall()\" [drawer]=\"isScreenSmall() ? 'modal' : 'dismissible'\" (opened)=\"handleOpened($event)\" (closed)=\"handleClosed($event)\" mdcTopAppBarFixedAdjust>\r\n    <mdc-drawer-content>\r\n        <mdc-list *ngFor=\"let item of sidebarItems$ | async\" >\r\n            <a *ngIf=\"!item.divider\" mdc-list-item [routerLink]=\"item.routerLink\" routerLinkActive=\"app-drawer-link-active\">\r\n                <mdc-icon mdcListItemGraphic>{{item.icon}}</mdc-icon>{{item.caption}}\r\n            </a>\r\n            <mdc-list-divider *ngIf=\"item.divider\"></mdc-list-divider>\r\n        </mdc-list>\r\n    </mdc-drawer-content>\r\n\r\n</mdc-drawer>\r\n<div mdcDrawerAppContent mdcTopAppBarFixedAdjust>\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.scss":
/*!********************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/full-layout/full-layout.component.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".protective-marking {\n  justify-content: center; }\n\n.protective-marking-row {\n  height: 20px; }\n\n.notification {\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtbGF5b3V0cy9zcmMvbGliL2Z1bGwtbGF5b3V0L0M6XFxVc2Vyc1xcYXBnaWxlc1xcQ29kZVxcREYtQ2xpZW50XFxkaWdpdGFsLWZpcnN0L2xpYnNcXGRmLWxheW91dHNcXHNyY1xcbGliXFxmdWxsLWxheW91dFxcZnVsbC1sYXlvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx1QkFBdUIsRUFBQTs7QUFHM0I7RUFDSSxZQUFZLEVBQUE7O0FBR2hCO0VBQ0ksdUJBQXVCLEVBQUEiLCJmaWxlIjoibGlicy9kZi1sYXlvdXRzL3NyYy9saWIvZnVsbC1sYXlvdXQvZnVsbC1sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvdGVjdGl2ZS1tYXJraW5nIHtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4ucHJvdGVjdGl2ZS1tYXJraW5nLXJvdyB7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24ge1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "../../libs/df-layouts/src/lib/full-layout/full-layout.component.ts":
/*!******************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/full-layout/full-layout.component.ts ***!
  \******************************************************************************************************************/
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
/*!****************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/full-layout/full-layout.service.ts ***!
  \****************************************************************************************************************/
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
/*!**********************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/simple-layout/simple-layout.component.ts ***!
  \**********************************************************************************************************************/
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
/*!**********************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/title-layout/title-layout.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mdc-top-app-bar class=\"app-top-app-bar\" #topAppBar fixed prominent=\"false\">\r\n  <mdc-top-app-bar-row>\r\n    <mdc-top-app-bar-section align=\"start\" title=\"{{ title }}\">\r\n      <a *ngIf=\"(logo$ | async) as logo\" [href]=\"logo.url\" [title]=\"logo.title\">\r\n        <img [src]=\"logo.image\" alt=\"\"\r\n      /></a>\r\n\r\n      <mdc-icon *ngIf=\"!(logo$ | async)\" mdcTopAppBarActionItem [routerLink]=\"['/']\">home</mdc-icon>\r\n    </mdc-top-app-bar-section>\r\n    <mdc-top-app-bar-section align=\"center\" class=\"protective-marking\">\r\n      <span>{{ protectiveMarking$ | async | uppercase }}</span>\r\n    </mdc-top-app-bar-section>\r\n    <mdc-top-app-bar-section align=\"end\">\r\n      <mdc-icon\r\n        *ngIf=\"(sidebarItems$ | async)?.length > 0\"\r\n        mdcTopAppBarActionItem\r\n        (click)=\"profileMenu.open = !profileMenu.open\"\r\n        >apps</mdc-icon\r\n      >\r\n\r\n      <digital-first-avatar\r\n        [name]=\"profile?.name\"\r\n        [email]=\"profile?.email\"\r\n        [displayType]=\"profile?.displayType\"\r\n        [size]=\"profile?.size\"\r\n        [background]=\"profile?.background\"\r\n      >\r\n      </digital-first-avatar>\r\n\r\n      <div mdcMenuSurfaceAnchor #menuAnchor>\r\n        <mdc-menu #profileMenu [anchorElement]=\"menuAnchor\">\r\n          <div class=\"nav-list wrap\">\r\n            <div *ngFor=\"let item of (appItems$ | async)\" class=\"nav-button\">\r\n              <a *ngIf=\"item.url\" [href]=\"item.url\" class=\"nav-button-anchor\" target=\"item.target\">\r\n                <span class=\"nav-button-icon material-icons\">{{\r\n                  item.icon\r\n                }}</span>\r\n                <div class=\"nav-button-text\">{{ item.caption }}</div>\r\n              </a>\r\n            </div>\r\n          </div>\r\n\r\n          <mdc-list>\r\n            <a\r\n              *ngFor=\"let item of (sidebarItems$ | async)\"\r\n              mdc-list-item\r\n              [routerLink]=\"item.routerLink\"\r\n            >\r\n              {{ item.caption }}\r\n            </a>\r\n          </mdc-list>\r\n\r\n          <div class=\"app-version\">Version {{ version }} {{bookType$ | async}}</div>\r\n        </mdc-menu>\r\n      </div>\r\n    </mdc-top-app-bar-section>\r\n  </mdc-top-app-bar-row>\r\n</mdc-top-app-bar>\r\n\r\n<div mdcTopAppBarFixedAdjust>\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.scss":
/*!**********************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/title-layout/title-layout.component.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mdc-top-app-bar__section {\n  width: 33%; }\n\n.protective-marking {\n  justify-content: center; }\n\n.protective-marking-row {\n  height: 20px; }\n\n.notification {\n  justify-content: center; }\n\n.mdc-menu {\n  width: 250px; }\n\n.app-version {\n  padding: 4px 16px;\n  font-size: 12px; }\n\n.nav-list {\n  padding: 4px;\n  margin: 0;\n  display: flex;\n  flex-direction: row;\n  align-items: center; }\n\n.nav-list .nav-button {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    width: 80px;\n    height: 100%;\n    color: #687381;\n    font-size: 12px;\n    font-weight: 500;\n    text-decoration: none;\n    transition: all linear 0.05s;\n    -webkit-transition: all linear 0.05s;\n    -moz-transition: all linear 0.05s; }\n\n.nav-list .nav-button-anchor {\n    color: #424242;\n    text-decoration: none; }\n\n.nav-list .nav-button-icon {\n    padding: 8px;\n    font-size: 48px; }\n\n.nav-list .nav-button-text {\n    width: 100%;\n    text-align: center; }\n\n.nowrap {\n  flex-wrap: nowrap; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvZGYtbGF5b3V0cy9zcmMvbGliL3RpdGxlLWxheW91dC9DOlxcVXNlcnNcXGFwZ2lsZXNcXENvZGVcXERGLUNsaWVudFxcZGlnaXRhbC1maXJzdC9saWJzXFxkZi1sYXlvdXRzXFxzcmNcXGxpYlxcdGl0bGUtbGF5b3V0XFx0aXRsZS1sYXlvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFVLEVBQUE7O0FBR1o7RUFDRSx1QkFBdUIsRUFBQTs7QUFHekI7RUFDRSxZQUFZLEVBQUE7O0FBR2Q7RUFDRSx1QkFBdUIsRUFBQTs7QUFHekI7RUFDRSxZQUFZLEVBQUE7O0FBR2Q7RUFDRSxpQkFBaUI7RUFDakIsZUFBZSxFQUFBOztBQUdqQjtFQUNFLFlBQVk7RUFDWixTQUFTO0VBQ1QsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUIsRUFBQTs7QUFMckI7SUFTSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsV0FBVztJQUNYLFlBQVk7SUFDWixjQUF5QjtJQUN6QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIsb0NBQW9DO0lBQ3BDLGlDQUFpQyxFQUFBOztBQXJCckM7SUF5QkksY0FBc0I7SUFDMUIscUJBQXFCLEVBQUE7O0FBMUJyQjtJQThCSSxZQUFZO0lBQ1osZUFBZSxFQUFBOztBQS9CbkI7SUFtQ0ksV0FBVztJQUNYLGtCQUFrQixFQUFBOztBQU10QjtFQUVFLGlCQUFpQixFQUFBOztBQUduQjtFQUVFLGVBQWUsRUFBQSIsImZpbGUiOiJsaWJzL2RmLWxheW91dHMvc3JjL2xpYi90aXRsZS1sYXlvdXQvdGl0bGUtbGF5b3V0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1kYy10b3AtYXBwLWJhcl9fc2VjdGlvbiB7XHJcbiAgd2lkdGg6IDMzJTtcclxufVxyXG5cclxuLnByb3RlY3RpdmUtbWFya2luZyB7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wcm90ZWN0aXZlLW1hcmtpbmctcm93IHtcclxuICBoZWlnaHQ6IDIwcHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24ge1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4ubWRjLW1lbnUge1xyXG4gIHdpZHRoOiAyNTBweDtcclxufVxyXG5cclxuLmFwcC12ZXJzaW9uIHtcclxuICBwYWRkaW5nOiA0cHggMTZweDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuXHJcbi5uYXYtbGlzdCB7XHJcbiAgcGFkZGluZzogNHB4O1xyXG4gIG1hcmdpbjogMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcblxyXG4gIC5uYXYtYnV0dG9ue1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB3aWR0aDogODBweDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGNvbG9yOiByZ2IoMTA0LCAxMTUsIDEyOSk7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIGxpbmVhciAwLjA1cztcclxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIGxpbmVhciAwLjA1cztcclxuICAgIC1tb3otdHJhbnNpdGlvbjogYWxsIGxpbmVhciAwLjA1cztcclxuICB9XHJcblxyXG4gIC5uYXYtYnV0dG9uLWFuY2hvciB7XHJcbiAgICBjb2xvcjogcmdiKDY2LCA2NiwgNjYpO1xyXG50ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgfVxyXG5cclxuICAubmF2LWJ1dHRvbi1pY29uIHtcclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIGZvbnQtc2l6ZTogNDhweDtcclxuICB9XHJcblxyXG4gIC5uYXYtYnV0dG9uLXRleHQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi5ub3dyYXAge1xyXG4gIC13ZWJraXQtZmxleC13cmFwOiBub3dyYXA7XHJcbiAgZmxleC13cmFwOiBub3dyYXA7XHJcbn1cclxuXHJcbi53cmFwIHtcclxuICAtd2Via2l0LWZsZXgtd3JhcDogd3JhcDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "../../libs/df-layouts/src/lib/title-layout/title-layout.component.ts":
/*!********************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/title-layout/title-layout.component.ts ***!
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
/*!******************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/title-layout/title-layout.service.ts ***!
  \******************************************************************************************************************/
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
/*!********************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pages/src/index.ts ***!
  \********************************************************************************/
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
/*!**********************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pages/src/lib/df-pages.module.ts ***!
  \**********************************************************************************************/
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
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pages/src/lib/error-page-not-found/error-page-not-found.component.ts ***!
  \**********************************************************************************************************************************/
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
/*!******************************************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pages/src/lib/error-server/error-server.component.ts ***!
  \******************************************************************************************************************/
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
/*!********************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pipes/src/index.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/df-pipes.module */ "../../libs/df-pipes/src/lib/df-pipes.module.ts"), exports);


/***/ }),

/***/ "../../libs/df-pipes/src/lib/df-pipes.module.ts":
/*!**********************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pipes/src/lib/df-pipes.module.ts ***!
  \**********************************************************************************************/
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
/*!*********************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pipes/src/lib/nice-name.pipe.ts ***!
  \*********************************************************************************************/
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
/*!*********************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pipes/src/lib/safe-html.pipe.ts ***!
  \*********************************************************************************************/
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
/*!**********************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pipes/src/lib/split-case.pipe.ts ***!
  \**********************************************************************************************/
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
/*!********************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-pipes/src/lib/truncate.pipe.ts ***!
  \********************************************************************************************/
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
/*!********************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-theme/src/index.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/df-theme.module */ "../../libs/df-theme/src/lib/df-theme.module.ts"), exports);


/***/ }),

/***/ "../../libs/df-theme/src/lib/df-theme.module.ts":
/*!**********************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/libs/df-theme/src/lib/df-theme.module.ts ***!
  \**********************************************************************************************/
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
/*!**********************************************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/node_modules/moment/locale sync ^\.\/.*$ ***!
  \**********************************************************************************************/
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
/*!******************************************************************!*\
  !*** C:/Users/apgiles/Code/DF-Client/digital-first/package.json ***!
  \******************************************************************/
/*! exports provided: name, version, commit-hash, license, scripts, private, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"digital-first","version":"0.0.0","commit-hash":"-------","license":"MIT","scripts":{"ng":"ng","start:commitments":"ng serve commitments --ssl --ssl-key ssl/server.key --ssl-cert ssl/server.crt --live-reload true","start:programs-admin":"ng serve programs-admin --ssl --ssl-key ssl/server.key --ssl-cert ssl/server.crt --live-reload true","start:commitments-reader":"ng serve commitments-reader","start:policy-briefs":"ng serve policy-briefs","start:deck":"ng serve deck --ssl --ssl-key ssl/server.key --ssl-cert ssl/server.crt --live-reload true","generate-graphql:deck":"gql-gen --config ./apps/deck/codegen.yml","generate-graphql:commitments-reader":"gql-gen --config ./apps/commitments-reader/codegen.yml","generate-graphql:programs-admin":"gql-gen --config ./apps/programs-admin/codegen.yml","generate-graphql:policy-briefs":"gql-gen --config ./apps/policy-briefs/codegen.yml","test:programs-admin":"ng test programs-admin","testwatch:programs-admin":"ng test programs-admin --watch","build":"ng build","build:all":"run-p build:programs-admin sharepoint:build:commitments sharepoint:build:commitments-reader","build:programs-admin":"ng build programs-admin --c9onfiguration=production","build:commitments-reader":"ng build commitments-reader --configuration=production","build:policy-briefs":"ng build policy-briefs --configuration=production","build:deck":"ng build deck --configuration=production","test":"ng test","lint":"./node_modules/.bin/nx lint && ng lint","e2e":"ng e2e","affected:apps":"./node_modules/.bin/nx affected:apps","affected:libs":"./node_modules/.bin/nx affected:libs","affected:build":"./node_modules/.bin/nx affected:build","affected:e2e":"./node_modules/.bin/nx affected:e2e","affected:test":"./node_modules/.bin/nx affected:test","affected:lint":"./node_modules/.bin/nx affected:lint","affected:dep-graph":"./node_modules/.bin/nx affected:dep-graph","format":"./node_modules/.bin/nx format:write","format:write":"./node_modules/.bin/nx format:write","format:check":"./node_modules/.bin/nx format:check","update":"ng update @nrwl/schematics","update-npm":"npx npm-check -u","update:check":"ng update","workspace-schematic":"./node_modules/.bin/nx workspace-schematic","dep-graph":"./node_modules/.bin/nx dep-graph","help":"./node_modules/.bin/nx help","deploy:all:commitments-reader":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrl 'http://vm-dev-lbs13/sites/commitments-reader' -AppName 'Commitments-Reader'","deploy:all":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrl 'http://vm-dev-lbs13/sites/commitments' -AppName 'Commitments'","deploy:js:commitments-reader":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrl 'http://vm-dev-lbs13/sites/commitments-reader' -AppName 'Commitments-Reader' -jsOnly","deploy:all:policy-briefs":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrl 'http://vm-dev-lbs13/sites/redigb' -AppName 'Policy-Briefs'","deploy:js:policy-briefs":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrl 'http://vm-dev-lbs13/sites/redigb' -AppName 'Policy-Briefs' -jsOnly","sharepoint:build:commitments":"ng build commitments --configuration=sharepoint","sharepoint:build:commitments-reader":"ng build commitments-reader --configuration=sharepoint","sharepoint:build:policy-briefs":"ng build policy-briefs --configuration=sharepoint","sharepoint:build":"run-p sharepoint:build:*","sharepoint:compile:commitments":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/commitments/Compile-Page.ps1","sharepoint:compile:commitments-reader":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/commitments-reader/Compile-Page.ps1","sharepoint:compile:policy-briefs":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/policy-briefs/Compile-Page.ps1","sharepoint:compile":"run-p sharepoint:compile:*","sharepoint:copyListDefinitions:commitments":"cpx ../sharepoint/commitments/ListDefinitions/*.* ../sharepoint/deploy/ListDefinitions/commitments","sharepoint:copyListDefinitions:commitments-reader":"cpx ../sharepoint/commitments-reader/ListDefinitions/*.* ../sharepoint/deploy/ListDefinitions/commitments-reader","sharepoint:copyListDefinitions:policy-briefs":"cpx ../sharepoint/policy-briefs/ListDefinitions/*.* ../sharepoint/deploy/ListDefinitions/policy-briefs","sharepoint:copyListDefinitions":"run-p sharepoint:copyListDefinitions:*","sharepoint:copyListData:commitments":"cpx ../sharepoint/commitments/Data/*.* ../sharepoint/deploy/ListData/commitments","sharepoint:copyListData:commitments-reader":"cpx ../sharepoint/commitments-reader/Data/*.* ../sharepoint/deploy/ListData/commitments-reader","sharepoint:copyListData:policy-briefs":"cpx ../sharepoint/policy-briefs/Data/*.* ../sharepoint/deploy/ListData/policy-briefs","sharepoint:copyListData":"run-p sharepoint:copyListData:*","sp:deploy:commitments":"run-s sharepoint:build:commitments sharepoint:compile:commitments sharepoint:copyListDefinitions:commitments sharepoint:copyListData:commitments deploy:js","sp:deploy:commitments-reader":"run-s sharepoint:build:commitments-reader sharepoint:compile:commitments-reader sharepoint:copyListDefinitions:commitments-reader sharepoint:copyListData:commitments-reader deploy:js:commitments-reader","sp:deploy:policy-briefs":"run-s sharepoint:build:policy-briefs sharepoint:compile:policy-briefs deploy:all:policy-briefs","deploy:js":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deploy/PostDeploy.ps1 -SiteUrl 'http://vm-dev-lbs13/sites/commitments' -AppName 'Commitments' -jsOnly","sharepoint:build:deck":"ng build deck --configuration=sharepoint","sharepoint:compile:deck":"@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ../sharepoint/deck/Compile-Page.ps1","sharepoint:copyListDefinitions:deck":"cpx ../sharepoint/deck/ListDefinitions/*.* ../sharepoint/deploy/ListDefinitions/deck","sharepoint:copyListData:deck":"cpx ../sharepoint/deck/Data/*.* ../sharepoint/deploy/ListData/deck","sp:deploy:deck":"run-s sharepoint:build:deck sharepoint:compile:deck sharepoint:copyListDefinitions:deck sharepoint:copyListData:deck deploy:js","sp:deploy":"run-s sharepoint:* deploy:js","sp:all":"run-s sharepoint:* deploy:all"},"private":true,"dependencies":{"@agm/core":"^1.0.0-beta.5","@angular-mdc/theme":"^0.44.0","@angular-mdc/web":"^0.44.0","@angular/animations":"^7.2.9","@angular/cdk":"^7.3.4","@angular/common":"^7.2.9","@angular/compiler":"^7.2.9","@angular/core":"^7.2.9","@angular/forms":"^7.2.9","@angular/http":"^7.2.9","@angular/platform-browser":"^7.2.9","@angular/platform-browser-dynamic":"^7.2.9","@angular/router":"^7.2.9","@auth0/angular-jwt":"^2.1.0","@df/components":"^0.2.30969","@df/sharepoint":"0.0.29205","@df/utils":"0.0.29505","@dsuite/programs-manager-messages":"^1.0.29141","@material/animation":"^1.0.0","@material/base":"^1.0.0","@material/button":"^1.0.1","@material/card":"^1.0.1","@material/dialog":"^1.0.1","@material/drawer":"^1.0.1","@material/elevation":"^1.0.0","@material/floating-label":"^1.0.0","@material/line-ripple":"^1.0.0","@material/menu":"^1.0.1","@material/menu-surface":"^1.0.1","@material/notched-outline":"^1.0.0","@material/ripple":"^1.0.1","@material/rtl":"^0.42.0","@material/select":"^1.0.1","@material/shape":"^1.0.0","@material/tabs":"^1.0.1","@material/theme":"^1.0.0","@material/typography":"^1.0.0","@mdi/angular-material":"^3.5.95","@mdi/font":"^3.5.95","@ng-select/ng-select":"^2.16.2","@ngrx/effects":"7.3.0","@ngrx/entity":"7.3.0","@ngrx/router-store":"7.3.0","@ngrx/store":"7.3.0","@nrwl/nx":"^7.7.1","@swimlane/ngx-datatable":"^14.0.0","@types/jest":"^24.0.11","angular-tree-component":"^8.3.0","apollo-angular":"^1.5.0","apollo-angular-link-http":"^1.5.0","apollo-cache-inmemory":"^1.5.1","apollo-client":"^2.5.1","apollo-link":"^1.2.11","apollo-link-debounce":"^2.1.0","apollo-link-error":"^1.1.8","bryntum-scheduler":"^2.0.30166","chart.js":"^2.8.0","classlist.js":"^1.1.20150312","codemirror":"^5.44.0","core-js":"^2.6.5","createjs-module":"^0.8.3","file-saver":"^2.0.1","graphql":"^14.1.1","graphql-tag":"^2.10.1","highlightjs":"^9.12.0","indefinite":"^2.2.1","jquery":"^3.3.1","jspdf":"^1.5.3","markdown-it":"^8.4.2","marked":"^0.6.1","moment":"^2.24.0","ng2-charts":"^1.6.0","ngrx-store-localstorage":"^7.0.0","ngx-cookie-service":"^2.1.0","ngx-file-drop":"^6.0.0","ngx-markdown":"^7.1.4","ngx-wig":"^1.6.0","pdfmake":"^0.1.54","plantuml-encoder":"^1.2.5","punycode":"^2.1.1","raphael":"^2.2.7","rxjs":"^6.4.0","squire-rte":"^1.9.0","terser":"^3.17.0","to-mark":"^1.1.3","tslib":"^1.9.3","tui-chart":"^3.6.1","tui-code-snippet":"^1.5.0","tui-editor":"^1.3.2","typeface-roboto":"0.0.54","web-animations-js":"^2.3.1","x2js":"^3.2.6","xlsx":"^0.14.1","zone.js":"^0.8.29"},"devDependencies":{"@angular-devkit/build-angular":"^0.13.5","@angular/cli":"^7.3.5","@angular/compiler-cli":"^7.2.9","@angular/language-service":"^7.2.9","@graphql-codegen/cli":"^1.0.6","@graphql-codegen/typescript":"^1.0.3","@graphql-codegen/typescript-apollo-angular":"^1.0.3","@graphql-codegen/typescript-operations":"^1.0.3","@ngrx/schematics":"^7.3.0","@ngrx/store-devtools":"^7.3.0","@nrwl/builders":"7.7.1","@nrwl/schematics":"^7.7.1","@types/googlemaps":"^3.30.19","@types/jasmine":"^3.3.9","@types/jasminewd2":"^2.0.6","@types/jquery":"3.3.6","@types/node":"^11.11.3","codelyzer":"~4.5.0","cpx":"^1.5.0","jasmine-core":"~3.3.0","jasmine-marbles":"0.4.1","jasmine-spec-reporter":"~4.2.1","jest":"^24.5.0","jest-preset-angular":"^7.0.1","karma":"~4.0.1","karma-chrome-launcher":"~2.2.0","karma-coverage-istanbul-reporter":"^2.0.5","karma-jasmine":"~2.0.1","karma-jasmine-html-reporter":"^1.4.0","ngrx-store-freeze":"0.2.4","prettier":"^1.16.4","protractor":"^5.4.2","ts-node":"~8.0.3","tslint":"~5.13.1","typescript":"3.2.4"}};

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
            template: '<router-outlet></router-outlet>'
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
var graphql_module_1 = __webpack_require__(/*! ./graphql.module */ "./src/app/graphql.module.ts");
var drag_drop_1 = __webpack_require__(/*! @angular/cdk/drag-drop */ "../../node_modules/@angular/cdk/esm5/drag-drop.es5.js");
var components_1 = __webpack_require__(/*! @df/components */ "../../node_modules/@df/components/fesm5/df-components.js");
var app_init_1 = __webpack_require__(/*! ./app-init */ "./src/app/app-init.ts");
var policy_briefs_data_service_1 = __webpack_require__(/*! ./services/policy-briefs-data.service */ "./src/app/services/policy-briefs-data.service.ts");
var brief_component_1 = __webpack_require__(/*! ./pages/brief/brief.component */ "./src/app/pages/brief/brief.component.ts");
var df_pages_1 = __webpack_require__(/*! @digital-first/df-pages */ "../../libs/df-pages/src/index.ts");
var df_pipes_1 = __webpack_require__(/*! @digital-first/df-pipes */ "../../libs/df-pipes/src/index.ts");
var get_brief_by_id_service_1 = __webpack_require__(/*! ./services/getBriefById/get-brief-by-id.service */ "./src/app/services/getBriefById/get-brief-by-id.service.ts");
var get_pack_navigation_service_1 = __webpack_require__(/*! ./services/getPackNavigation/get-pack-navigation.service */ "./src/app/services/getPackNavigation/get-pack-navigation.service.ts");
var COMPONENTS = [app_component_1.AppComponent, home_component_1.HomeComponent, brief_component_1.BriefComponent];
var ENTRYCOMPONENTS = [];
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
                forms_1.ReactiveFormsModule,
                nx_1.NxModule.forRoot(),
                graphql_module_1.GraphQLModule,
                df_layouts_1.DfLayoutsModule,
                components_1.ButtonModule,
                components_1.PanelModule,
                components_1.RefinerModule,
                components_1.AvatarModule,
                components_1.DiscussionModule,
                components_1.DocumentModule,
                app_routing_module_1.AppRoutingModule,
                drag_drop_1.DragDropModule,
                df_pages_1.DfPagesModule,
                df_pipes_1.DfPipesModule
            ],
            providers: [
                utils_1.WINDOW_PROVIDERS,
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: app_init_1.initApplication,
                    deps: [],
                    multi: true
                },
                policy_briefs_data_service_1.PolicyBriefsDataService,
                { provide: df_layouts_1.TitleLayoutService, useClass: app_full_layout_service_1.AppFullLayoutService },
                get_brief_by_id_service_1.getBriefByIdServiceProvider,
                get_pack_navigation_service_1.getPackNavigationServiceProvider
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/graphql.module.ts":
/*!***********************************!*\
  !*** ./src/app/graphql.module.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
var apollo_angular_1 = __webpack_require__(/*! apollo-angular */ "../../node_modules/apollo-angular/fesm5/ng.apollo.js");
var apollo_angular_link_http_1 = __webpack_require__(/*! apollo-angular-link-http */ "../../node_modules/apollo-angular-link-http/fesm5/ng.apolloLink.http.js");
var apollo_cache_inmemory_1 = __webpack_require__(/*! apollo-cache-inmemory */ "../../node_modules/apollo-cache-inmemory/lib/bundle.esm.js");
var environment_1 = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var GraphQLModule = /** @class */ (function () {
    function GraphQLModule(apollo, httpClient) {
        var _this = this;
        this.httpClient = httpClient;
        Object.keys(environment_1.environment.datasources)
            .filter(function (key) { return environment_1.environment.datasources[key].type === 'apollo'; })
            .forEach(function (key) {
            var options = {
                link: new apollo_angular_link_http_1.HttpLink(_this.httpClient).create({
                    uri: environment_1.environment.datasources[key].dataServiceUrl
                }),
                cache: new apollo_cache_inmemory_1.InMemoryCache()
            };
            apollo.create(options, key);
        });
    }
    GraphQLModule = tslib_1.__decorate([
        core_1.NgModule({
            exports: [http_1.HttpClientModule, apollo_angular_1.ApolloModule, apollo_angular_link_http_1.HttpLinkModule]
        }),
        tslib_1.__metadata("design:paramtypes", [apollo_angular_1.Apollo, http_1.HttpClient])
    ], GraphQLModule);
    return GraphQLModule;
}());
exports.GraphQLModule = GraphQLModule;


/***/ }),

/***/ "./src/app/pages/brief/brief.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/brief/brief.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-page\">\r\n  <div class=\"brief-layout\">\r\n    <nav>\r\n      <df-pack-navigator\r\n        [nodes]=\"nodes$ | async\"\r\n        (onSelect)=\"handleSelectNavigatorNode($event)\"\r\n        (onMoveNode)=\"handleEvent($event, 'Move')\"\r\n      ></df-pack-navigator>\r\n    </nav>\r\n    <section>\r\n      <df-expander-panel\r\n        title=\"Discussion\"\r\n        [background]=\"background$ | async\"\r\n        expanded=\"true\"\r\n      >\r\n        <df-discussion\r\n          [hostId]=\"'some-guid'\"\r\n          [comments]=\"comments$ | async\"\r\n          (onReplyToComment)=\"handleReplyToComment($event, 'onReplyToComment')\"\r\n          (onDeleteComment)=\"handleDeleteComment($event, 'onDeleteComment')\"\r\n          (onAddComment)=\"handleAddComment($event, 'onAddComment')\"\r\n        ></df-discussion>\r\n      </df-expander-panel>\r\n      <df-expander-panel\r\n        title=\"Sample Policy Brief\"\r\n        [background]=\"background$ | async\"\r\n        expandable=\"false\"\r\n        expanded=\"true\"\r\n      >\r\n        <ng-container panel-buttons>\r\n          <span class=\"brief-reference\">BRIEF-19-000001</span>\r\n          <df-button\r\n            class=\"edit\"\r\n            title=\"Edit\"\r\n            icon=\"edit\"\r\n            [background]=\"background$ | async\"\r\n            (onClick)=\"handleEdit($event)\"\r\n          ></df-button>\r\n          <df-button\r\n            title=\"Subscribe\"\r\n            icon=\"add_alert\"\r\n            [background]=\"background$ | async\"\r\n            (onClick)=\"handleEdit($event)\"\r\n          ></df-button>\r\n          <df-button\r\n            title=\"Admin\"\r\n            icon=\"settings\"\r\n            [background]=\"background$ | async\"\r\n            (onClick)=\"handleEdit($event)\"\r\n          ></df-button>\r\n        </ng-container>\r\n        <div class=\"GhostWhite brief-document\">\r\n          <form [formGroup]=\"form\" (ngSubmit)=\"handleSubmit($event)\" autocomplete=\"off\">\r\n            <df-status-picker\r\n              [statuses]=\"documentStatusList$ | async\"\r\n              [formControlName]=\"'status'\"\r\n            >\r\n            </df-status-picker>\r\n            <div>\r\n                <div class=\"brief-protective-marking\"><strong>UNCLASSIFIED</strong></div>\r\n            </div>\r\n            <div [innerHtml]=\"briefHtml$ | async | safeHtml\"></div>\r\n          </form>\r\n        </div>\r\n      </df-expander-panel>\r\n    </section>\r\n  </div>\r\n  <div class=\"brief-layout\"><section>\r\n      <p>Form Status: {{ form.status }}</p>\r\n      <pre>{{ form.value | json }}</pre>\r\n  </section></div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/brief/brief.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/brief/brief.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  width: -webkit-fill-available;\n  display: flex;\n  flex-direction: column; }\n\ndf-button.edit {\n  min-width: 80px; }\n\ndf-status-picker {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.brief-protective-marking {\n  color: red;\n  width: 100%;\n  text-align: center; }\n\n.brief-reference {\n  min-width: 170px;\n  width: 170px;\n  padding-right: 20px;\n  text-align: right; }\n\n.brief-document {\n  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);\n  background-color: white !important;\n  color: #424242 !important;\n  padding: 5px 64px;\n  width: calc(100% - 128px);\n  overflow-x: hidden; }\n\n.brief-layout {\n  display: flex;\n  flex-direction: row; }\n\n.brief-layout nav {\n    padding: 6px;\n    width: 350px;\n    display: flex;\n    flex-direction: column; }\n\n.brief-layout section {\n    width: 100%;\n    display: flex;\n    flex-direction: column; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHMvcG9saWN5LWJyaWVmcy9zcmMvYXBwL3BhZ2VzL2JyaWVmL0M6XFxVc2Vyc1xcYXBnaWxlc1xcQ29kZVxcREYtQ2xpZW50XFxkaWdpdGFsLWZpcnN0L2FwcHNcXHBvbGljeS1icmllZnNcXHNyY1xcYXBwXFxwYWdlc1xcYnJpZWZcXGJyaWVmLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLDZCQUE2QjtFQUM3QixhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBR3hCO0VBQ0UsZUFBZSxFQUFBOztBQUdqQjtFQUNJLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CLEVBQUE7O0FBR3ZCO0VBQ0ksVUFBVTtFQUNWLFdBQVc7RUFDWCxrQkFDSixFQUFBOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsaUJBQWlCLEVBQUE7O0FBR25CO0VBQ0UsZ0hBQ21DO0VBQ25DLGtDQUErQztFQUMvQyx5QkFBaUM7RUFFakMsaUJBQWlCO0VBQ2pCLHlCQUF5QjtFQUN6QixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CLEVBQUE7O0FBRnJCO0lBS0ksWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2Isc0JBQXNCLEVBQUE7O0FBUjFCO0lBWUksV0FBVztJQUNYLGFBQWE7SUFDYixzQkFBc0IsRUFBQSIsImZpbGUiOiJhcHBzL3BvbGljeS1icmllZnMvc3JjL2FwcC9wYWdlcy9icmllZi9icmllZi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICB3aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbmRmLWJ1dHRvbi5lZGl0IHtcclxuICBtaW4td2lkdGg6IDgwcHg7XHJcbn1cclxuXHJcbmRmLXN0YXR1cy1waWNrZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uYnJpZWYtcHJvdGVjdGl2ZS1tYXJraW5nIHtcclxuICAgIGNvbG9yOiByZWQ7IFxyXG4gICAgd2lkdGg6IDEwMCU7IFxyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyXHJcbn1cclxuXHJcbi5icmllZi1yZWZlcmVuY2Uge1xyXG4gIG1pbi13aWR0aDogMTcwcHg7XHJcbiAgd2lkdGg6IDE3MHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuXHJcbi5icmllZi1kb2N1bWVudCB7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAxcHggMTBweCAwIHJnYmEoMCwgMCwgMCwgMC4xMiksXHJcbiAgICAwIDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpICFpbXBvcnRhbnQ7XHJcbiAgY29sb3I6IHJnYig2NiwgNjYsIDY2KSAhaW1wb3J0YW50O1xyXG5cclxuICBwYWRkaW5nOiA1cHggNjRweDtcclxuICB3aWR0aDogY2FsYygxMDAlIC0gMTI4cHgpO1xyXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcclxufVxyXG5cclxuLmJyaWVmLWxheW91dCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG5cclxuICBuYXYge1xyXG4gICAgcGFkZGluZzogNnB4O1xyXG4gICAgd2lkdGg6IDM1MHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG5cclxuICBzZWN0aW9uIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

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
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var mock_data_1 = __webpack_require__(/*! ./mock-data */ "./src/app/pages/brief/mock-data.ts");
var utils_1 = __webpack_require__(/*! @df/utils */ "../../node_modules/@df/utils/fesm5/df-utils.js");
var get_brief_by_id_service_1 = __webpack_require__(/*! ../../services/getBriefById/get-brief-by-id.service */ "./src/app/services/getBriefById/get-brief-by-id.service.ts");
var defaultBrief = {
    status: '1'
};
var BriefComponent = /** @class */ (function () {
    // tslint:disable-next-line:no-empty
    function BriefComponent(fb, getBriefByIdService) {
        this.fb = fb;
        this.getBriefByIdService = getBriefByIdService;
        this.navData$ = new rxjs_1.BehaviorSubject([]);
        this.briefHtml$ = new rxjs_1.BehaviorSubject(mock_data_1.baconIpsum);
        this.background$ = new rxjs_1.BehaviorSubject('#455a64');
        this.comments$ = new rxjs_1.BehaviorSubject(mock_data_1.discussionTree);
        this.activeComment$ = new rxjs_1.BehaviorSubject(null);
        this.form = this.fb.group({
            status: [null]
        });
    }
    BriefComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.navData$.next(this.storyData);
        this.nodes$ = this.navData$.pipe(operators_1.map(function (nd) {
            return utils_1.toTree(nd.sort(utils_1.sortBy('order')), {
                id: 'id',
                parentId: 'parent',
                children: 'children',
                level: 'level'
            });
        }));
        this.nodesSubscription$ = this.nodes$.subscribe(function (p) { return (_this.tree = p); });
        this.documentStatusList$ = new rxjs_1.BehaviorSubject(mock_data_1.statuslist);
        this.form.patchValue(defaultBrief);
        this.formValueChangeSubscription$ = this.form.valueChanges
            .pipe(operators_1.debounceTime(3000), operators_1.distinctUntilChanged())
            .subscribe(function (blurEvent) {
            _this.handleChange(blurEvent);
            _this.formValueChangeSubscription$.unsubscribe();
        });
    };
    BriefComponent.prototype.ngOnDestroy = function () {
        this.nodesSubscription$.unsubscribe();
    };
    BriefComponent.prototype.handleChange = function ($event) {
        var editedBrief = this.mapFormToBrief(this.form.value);
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
    BriefComponent.prototype.handleSelectNavigatorNode = function (node) {
        var navData = this.storyData.map(function (n) { return (tslib_1.__assign({}, n, { active: false })); });
        var found = tslib_1.__assign({}, navData.find(function (n) { return n.id === node.id; }));
        found.active = true;
        var list = navData.filter(function (n) { return n.id !== node.id; }).concat([found]);
        this.navData$.next(list);
    };
    BriefComponent.prototype.handleReplyToComment = function ($event) {
        // tslint:disable-next-line:no-console
        console.log("\uD83D\uDCAC -  ReplyToComment", $event);
    };
    BriefComponent.prototype.handleDeleteComment = function ($event) {
        // tslint:disable-next-line:no-console
        console.log("\uD83D\uDCAC -  DeleteComment", $event);
    };
    BriefComponent.prototype.handleAddComment = function ($event) {
        // tslint:disable-next-line:no-console
        console.log("\uD83D\uDCAC -  AddComment", $event);
    };
    BriefComponent.prototype.handleEvent = function ($event, action) {
        // tslint:disable-next-line:no-console
        console.log("\uD83E\uDD8D - " + action, $event);
    };
    BriefComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'digital-first-brief',
            template: __webpack_require__(/*! ./brief.component.html */ "./src/app/pages/brief/brief.component.html"),
            styles: [__webpack_require__(/*! ./brief.component.scss */ "./src/app/pages/brief/brief.component.scss")]
        }),
        tslib_1.__metadata("design:paramtypes", [forms_1.FormBuilder,
            get_brief_by_id_service_1.GetBriefByIdService])
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

/***/ "./src/app/services/getBriefById/get-brief-by-id.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/services/getBriefById/get-brief-by-id.service.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var sharepoint_1 = __webpack_require__(/*! @df/sharepoint */ "../../node_modules/@df/sharepoint/fesm5/df-sharepoint.js");
var apollo_angular_1 = __webpack_require__(/*! apollo-angular */ "../../node_modules/apollo-angular/fesm5/ng.apollo.js");
var settings_service_1 = __webpack_require__(/*! ../settings.service */ "./src/app/services/settings.service.ts");
var get_brief_by_id_sharepoint_service_1 = __webpack_require__(/*! ./sharepoint/get-brief-by-id-sharepoint.service */ "./src/app/services/getBriefById/sharepoint/get-brief-by-id-sharepoint.service.ts");
var GetBriefByIdService = /** @class */ (function () {
    function GetBriefByIdService() {
    }
    GetBriefByIdService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], GetBriefByIdService);
    return GetBriefByIdService;
}());
exports.GetBriefByIdService = GetBriefByIdService;
var getBriefByIdServiceFactory = function (settings, sharepointlib, apollo) {
    var source = null;
    if (settings.datasources) {
        source = settings.datasources['brief'].type;
    }
    switch (source) {
        case 'sharepoint':
            return new get_brief_by_id_sharepoint_service_1.GetBriefByIdSharepointService(sharepointlib);
        default:
        // return new GetBriefByIdApolloService(apollo)
    }
};
exports.getBriefByIdServiceProvider = {
    provide: GetBriefByIdService,
    useFactory: getBriefByIdServiceFactory,
    deps: [settings_service_1.SettingsService, sharepoint_1.SharepointJsomService, apollo_angular_1.Apollo]
};


/***/ }),

/***/ "./src/app/services/getBriefById/sharepoint/get-brief-by-id-sharepoint.service.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/services/getBriefById/sharepoint/get-brief-by-id-sharepoint.service.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var sharepoint_1 = __webpack_require__(/*! @df/sharepoint */ "../../node_modules/@df/sharepoint/fesm5/df-sharepoint.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var GetBriefByIdSharepointService = /** @class */ (function () {
    function GetBriefByIdSharepointService(sharepointlib) {
        this.sharepointlib = sharepointlib;
    }
    GetBriefByIdSharepointService.prototype.getBriefById = function (briefId) {
        return rxjs_1.of(null);
    };
    GetBriefByIdSharepointService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [sharepoint_1.SharepointJsomService])
    ], GetBriefByIdSharepointService);
    return GetBriefByIdSharepointService;
}());
exports.GetBriefByIdSharepointService = GetBriefByIdSharepointService;


/***/ }),

/***/ "./src/app/services/getPackNavigation/apollo/get-pack-navigation-apollo.service.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/services/getPackNavigation/apollo/get-pack-navigation-apollo.service.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var apollo_angular_1 = __webpack_require__(/*! apollo-angular */ "../../node_modules/apollo-angular/fesm5/ng.apollo.js");
var GetPackNavigationApolloService = /** @class */ (function () {
    function GetPackNavigationApolloService(apollo) {
        this.apollo = apollo;
    }
    GetPackNavigationApolloService.prototype.getPackNavigation = function (briefId) {
        return rxjs_1.of(null);
    };
    GetPackNavigationApolloService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [apollo_angular_1.Apollo])
    ], GetPackNavigationApolloService);
    return GetPackNavigationApolloService;
}());
exports.GetPackNavigationApolloService = GetPackNavigationApolloService;


/***/ }),

/***/ "./src/app/services/getPackNavigation/get-pack-navigation.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/services/getPackNavigation/get-pack-navigation.service.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var sharepoint_1 = __webpack_require__(/*! @df/sharepoint */ "../../node_modules/@df/sharepoint/fesm5/df-sharepoint.js");
var apollo_angular_1 = __webpack_require__(/*! apollo-angular */ "../../node_modules/apollo-angular/fesm5/ng.apollo.js");
var settings_service_1 = __webpack_require__(/*! ../settings.service */ "./src/app/services/settings.service.ts");
var get_pack_navigation_sharepoint_service_1 = __webpack_require__(/*! ./sharepoint/get-pack-navigation-sharepoint.service */ "./src/app/services/getPackNavigation/sharepoint/get-pack-navigation-sharepoint.service.ts");
var get_pack_navigation_apollo_service_1 = __webpack_require__(/*! ./apollo/get-pack-navigation-apollo.service */ "./src/app/services/getPackNavigation/apollo/get-pack-navigation-apollo.service.ts");
var GetPackNavigationService = /** @class */ (function () {
    function GetPackNavigationService() {
    }
    GetPackNavigationService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], GetPackNavigationService);
    return GetPackNavigationService;
}());
exports.GetPackNavigationService = GetPackNavigationService;
var getPackNavigationServiceFactory = function (settings, sharepointlib, apollo) {
    var source = null;
    if (settings.datasources) {
        source = settings.datasources['packNavigation'].type;
    }
    switch (source) {
        case 'sharepoint':
            return new get_pack_navigation_sharepoint_service_1.GetPackNavigationSharepointService(sharepointlib);
        default:
            return new get_pack_navigation_apollo_service_1.GetPackNavigationApolloService(apollo);
    }
};
exports.getPackNavigationServiceProvider = {
    provide: GetPackNavigationService,
    useFactory: getPackNavigationServiceFactory,
    deps: [settings_service_1.SettingsService, sharepoint_1.SharepointJsomService, apollo_angular_1.Apollo]
};


/***/ }),

/***/ "./src/app/services/getPackNavigation/sharepoint/get-pack-navigation-sharepoint.service.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/services/getPackNavigation/sharepoint/get-pack-navigation-sharepoint.service.ts ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var sharepoint_1 = __webpack_require__(/*! @df/sharepoint */ "../../node_modules/@df/sharepoint/fesm5/df-sharepoint.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var GetPackNavigationSharepointService = /** @class */ (function () {
    function GetPackNavigationSharepointService(sharepointlib) {
        this.sharepointlib = sharepointlib;
    }
    GetPackNavigationSharepointService.prototype.getPackNavigation = function (briefId) {
        return rxjs_1.of(null);
    };
    GetPackNavigationSharepointService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [sharepoint_1.SharepointJsomService])
    ], GetPackNavigationSharepointService);
    return GetPackNavigationSharepointService;
}());
exports.GetPackNavigationSharepointService = GetPackNavigationSharepointService;


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

/***/ "./src/app/services/settings.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/settings.service.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var environment_1 = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var SettingsService = /** @class */ (function () {
    function SettingsService() {
    }
    Object.defineProperty(SettingsService.prototype, "environment", {
        get: function () {
            return environment_1.environment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "datasources", {
        get: function () {
            return environment_1.environment.datasources;
        },
        enumerable: true,
        configurable: true
    });
    SettingsService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;


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
    config: 'assets/config.txt',
    datasources: {
        deck: {
            type: 'sharepoint',
            dataServiceUrl: ''
        },
        commitments: {
            type: 'apollo',
            dataServiceUrl: ''
        },
        brief: {
            type: 'sharepoint',
            dataServiceUrl: ''
        },
        packNavigation: {
            type: 'sharepoint',
            dataServiceUrl: ''
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
    config: '//vm-dev-lbs13/sites/redigb/SiteAssets/apps/policy-briefs/assets/config.txt',
    datasources: {
        deck: {
            type: 'sharepoint',
            dataServiceUrl: ''
        },
        commitments: {
            type: 'apollo',
            dataServiceUrl: ''
        },
        brief: {
            type: 'sharepoint',
            dataServiceUrl: ''
        },
        packNavigation: {
            type: 'sharepoint',
            dataServiceUrl: ''
        }
    }
};


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

module.exports = __webpack_require__(/*! C:\Users\apgiles\Code\DF-Client\digital-first\apps\policy-briefs\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map