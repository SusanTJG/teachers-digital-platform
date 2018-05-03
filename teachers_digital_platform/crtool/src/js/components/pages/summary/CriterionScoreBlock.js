import React from "react";

import C from "../../../business.logic/constants";
import ViewEditResponseComponent from "../../common/ViewEditResponseComponent";

export default class CriterionScoreBlock extends React.Component {
    criterionAnswerChanged(key, checkedValue) {
        this.props.criterionAnswerChanged(this.props.dimensionPage, key, checkedValue);
    }

    renderTextValue(style, level) {
        let criterionScore = this.props.criterionScores[this.props.dimensionKey + this.props.criterionNumber];
        let isTrue = false;

        if (level === "exceeds" && criterionScore !== undefined){
            isTrue = criterionScore.exceeds;
        } else if (level === "meets" && criterionScore !== undefined) {
            isTrue = criterionScore.meets;
        } else if (level === "doesnotmeet" && criterionScore !== undefined) {
            isTrue = criterionScore.doesnotmeet;
        }

        let textValue = "m-form-field_radio-" + style;
        if (isTrue) {
            textValue += " is-active";
        }

        return textValue;
    }

    renderExceedsText() {
        if (this.props.criterionExceedsText) {
            return (<div dangerouslySetInnerHTML={{__html: this.props.criterionExceedsText}} />);
        } else {
            return null;
        }
    }

    renderMeetsText() {
        if (this.props.criterionMeetsText) {
            return (<div dangerouslySetInnerHTML={{__html: this.props.criterionMeetsText}} />);
        } else {
            return null;
        }
    }

    renderDoesNotMeetText() {
        if (this.props.criterionDoesNotMeetText) {
            return (<div dangerouslySetInnerHTML={{__html: this.props.criterionDoesNotMeetText}} />);
        } else {
            return null;
        }
    }

    renderExceeds() {
        if (this.props.showExceeds) {
            return (
                <li className="u-mb30">
                    <div className="m-form-field
                                    m-form-field__radio
                                    m-form-field__display">
                        <div className="a-label">
                            <svg className={this.renderTextValue("icon", "exceeds")} viewBox="0 0 22 22">
                                <circle cx="11" cy="11" r="10" className="m-form-field_radio-icon-stroke"></circle>
                                <circle cx="11" cy="11" r="7" className="m-form-field_radio-icon-fill"></circle>
                            </svg>
                            <div className={this.renderTextValue("text", "exceeds")} >
                                <div><strong>Exceeds</strong></div>
                                {this.props.criterionExceedsContent}
                                {this.renderExceedsText()}
                            </div>
                        </div>
                    </div>
                </li>
            );
        } else {
            return null;
        }
    }

    renderEssential() {
        let essentialAnswerTotalText = "<b>Your answers for essential components:</b>";
        if (this.props.essentialAnswerTotalText !== undefined && this.props.essentialAnswerTotalText !== "") {
            essentialAnswerTotalText = this.props.essentialAnswerTotalText;
        }

        return (
            <React.Fragment>
                <p dangerouslySetInnerHTML={{__html: essentialAnswerTotalText}} />
                <ul className="m-component-list">
                    <li><b>{this.props.criterionScores[this.props.dimensionKey + this.props.criterionNumber].essential_total_yes}</b> Yes</li>
                    <li><b>{this.props.criterionScores[this.props.dimensionKey + this.props.criterionNumber].essential_total_no}</b> No</li>
                </ul>
            </React.Fragment>
        );
    }

    renderBeneficial() {
        let beneficialAnswerTotalText = "<b>Your answers for beneficial components:</b>";
        if (this.props.beneficialAnswerTotalText !== undefined && this.props.beneficialAnswerTotalText !== "") {
            beneficialAnswerTotalText = this.props.beneficialAnswerTotalText;
        }
        if (this.props.showBeneficial) {
            return (
                <React.Fragment>
                    <p dangerouslySetInnerHTML={{__html: beneficialAnswerTotalText}} />
                    <ul className="m-component-list">
                        <li><b>{this.props.criterionScores[this.props.dimensionKey + this.props.criterionNumber].beneficial_total_yes}</b> Yes</li>
                        <li><b>{this.props.criterionScores[this.props.dimensionKey + this.props.criterionNumber].beneficial_total_no}</b> No</li>
                    </ul>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    renderMyNotes() {
        if (this.props.currentPrintButton === C.START_PAGE) {
            return this.renderNotesEditableVersion();
        }
        else {
            return this.renderNotesPrintVersion();
        }
    }

    renderNotesEditableVersion() {
        return (
            <textarea className="a-text-input a-text-input__full"
                rows="6"
                id={this.props.dimensionKey + "notes-optional-" + this.props.criterionNumber}
                ref={this.props.dimensionKey + "notes-optional-" + this.props.criterionNumber}
                value={this.props.criterionAnswers[this.props.dimensionKey + "notes-optional-" + this.props.criterionNumber]}
                onChange={e=>this.criterionAnswerChanged(this.props.dimensionKey + "notes-optional-" + this.props.criterionNumber, e.target.value)} >
            </textarea>
        );
    }

    renderNotesPrintVersion() {
        let notes = this.props.criterionAnswers[this.props.dimensionKey + "notes-optional-" + this.props.criterionNumber];
        if (notes === undefined || notes === "") {
            return (<p class="o-survey_question-helper">No information provided</p>);
        } else {
            return notes;
        }
    }

    renderNotesHelperText() {
        if (this.props.currentPrintButton === C.START_PAGE) {
            return (
                <small className="a-label_helper a-label_helper__block">
                    Anything you want to note about this criterion? Please do not share any Personally Identifiable Information (PII), including, but not limited to, your name, address, phone number, email address, Social Security number, etc.
                </small>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <React.Fragment>
                <hr className="hr
                                u-mb30
                                u-mt30" />
                <ViewEditResponseComponent criterionPage={this.props.dimensionPage} {...this.props} />
                <h3 className="h2">{this.props.criterionName}</h3>
                <p className="u-mb30">{this.props.criterionLead}</p>
                <div className="m-curriculum-status">
                    <ul className="m-list__unstyled
                                    u-mb0">

                        {this.renderExceeds()}

                        {this.props.hideMeets !== "true" &&
                            <li className="u-mb30">
                                <div className="m-form-field
                                                m-form-field__radio
                                                m-form-field__display">
                                    <div className="a-label">
                                        <svg className={this.renderTextValue("icon", "meets")} viewBox="0 0 22 22">
                                            <circle cx="11" cy="11" r="10" className="m-form-field_radio-icon-stroke"></circle>
                                            <circle cx="11" cy="11" r="7" className="m-form-field_radio-icon-fill"></circle>
                                        </svg>
                                        <div className={this.renderTextValue("text", "meets")} >
                                            <div><strong>Meets</strong></div>
                                            {this.renderMeetsText()}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        }

                        <li className="u-mb30">
                            <div className="m-form-field
                                            m-form-field__radio
                                            m-form-field__display">
                                <div className="a-label">
                                    <svg className={this.renderTextValue("icon", "doesnotmeet")} viewBox="0 0 22 22">
                                        <circle cx="11" cy="11" r="10" className="m-form-field_radio-icon-stroke"></circle>
                                        <circle cx="11" cy="11" r="7" className="m-form-field_radio-icon-fill"></circle>
                                    </svg>
                                    <div className={this.renderTextValue("text", "doesnotmeet")} >
                                        <div><strong>Does not meet</strong></div>
                                        {this.renderDoesNotMeetText()}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="m-curriculum-status_components">
                        {this.renderEssential()}
                        {this.renderBeneficial()}
                    </div>
                </div>
                <div className="m-form-field m-form-field__textarea">
                    <label className="a-label a-label__heading" htmlFor={this.props.dimensionKey + "notes-optional-" + this.props.criterionNumber}>
                        My notes
                        &nbsp;<small className="a-label_helper">(optional)</small>
                        {this.renderNotesHelperText()}
                    </label>

                    <p>{this.renderMyNotes()}</p>
                </div>
            </React.Fragment>
        );
    }
}
