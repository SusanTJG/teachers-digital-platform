import React from "react";

import C from "../../business.logic/constants";
import SvgIcon from "../svgs/SvgIcon";
import SaveWorkModal from "../dialogs/SaveWorkModal";
import CriterionLinkWrapper from "./CriterionLinkWrapper";
import EfficacyStudyComponent from "./partial.pages/EfficacyStudyComponent";
import EditableSubComponentRow from "./partial.pages/EditableSubComponentRow";
import EditableCriterionRowWrapper from "./partial.pages/EditableCriterionRowWrapper";

export default class EfficacyCriterionPage extends React.Component {
    criterionAnswerChanged(key, checkedValue) {

        console.log("criterionAnswerChanged - key: " + key + " => value: " + checkedValue);

        this.initializeAnswerValuesByRefs();
        this.props.criterionAnswerChanged(C.EFFICACY_PAGE, key, checkedValue);
    }

    componentDidMount() {
        this.initializeAnswerValuesByRefs();
    }

    initializeAnswerValuesByRefs() {
        var myObjects = this.refs;
        this.props.initializeAnswerObjects(myObjects);
    }

    shouldHideAdditonalCriterion(currentCriterion) {

        //TODO: Only show Additional criterion if 2 studies are strong
        //      a study is strong if all essential criterion are true
        
        return false;
        // let currentCriterionGroupName = currentCriterion.replace("-question", "");

        // if (this.props.criterionScores[currentCriterionGroupName] !== undefined &&
        //     this.props.criterionScores[currentCriterionGroupName].all_yes) {
        //     return false;
        // }
        // else {
        //     return true;
        // }
    }

    getEfficacyStudyItems() {
        let studyComponents = this.props.criterionEfficacyStudies;
        return studyComponents;
    }

    AddEfficacyStudy() {
        let maxValue = this.getMaxValueFromEfficacyItems() + 1;
        this.props.initializeEfficacyStudies(maxValue);
    }

    getMaxValueFromEfficacyItems() {
        let studyComponents = Array.from(this.props.criterionEfficacyStudies);
        let maxNumber = Math.max.apply(Math, studyComponents);
        return maxNumber;
    }

    generateStudyRefId(criterionNumber, otherText) {
        let newCriterionRefId = "efficacy-crt-question-" + criterionNumber + otherText;
        return newCriterionRefId;
    }

    render() {
        return (
            <React.Fragment>
                <hr className="hr
                            u-mb45
                            u-mt30" />
                <h2 className="h1">
                    <SvgIcon
                        icon="credit-report-round"
                        isLarge="true"
                        hasSpaceAfter="true" />
                    Efficacy
                </h2>
                <p className="lead-paragraph">
                    The efficacy dimension assesses the measurable impact the curriculum has had on students by looking at high-quality studies that have been done about its effectiveness. Evaluation criteria are based on research and major national and state education standards. <a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/files.consumerfinance.gov/f/201509_cfpb_youth-financialeducation-curriculum-review.pdf">Learn more about how the review was developed</a>.
                </p>
                <h3 className="h2">Instructions</h3>
                <ul>
                    <li>Locate research studies that report on the impact of the curriculum.</li>
                    <li>Review each study, paying particular attention to the following:
                        <ul>
                            <li>Citations, which indicate whether the study was recent</li>
                            <li>Abstract, which indicates which curriculum was reviewed, the study design, and the findings</li>
                            <li>Study design, which indicates whether the study format included a comparison group and the outcome measures; this information might also be in the sample and measures sections</li>
                            <li>Results, which provide the findings</li>
                        </ul>
                    </li>
                    <li>For <b><em>each study,</em></b> answer the questions in Criterion 1 to determine if it’s a strong study. Review all studies before moving onto Criterion 2.
                        <ul>
                            <li>If a study is strong, you’ll reference it when answering the questions in Criteria 2 and 3.</li>
                            <li>If no studies meet the inclusion criteria (none were strong), you don’t need to complete Criteria 2 and 3 and can move on to the efficacy summary.</li>
                        </ul>
                    </li>
                    <li>Complete Criteria 2 and 3 using all strong studies.</li>
                </ul>
                <div className="o-well
                                u-mb30
                                u-mt30">
                    <h4>This dimension has <em>essential</em> and <em>beneficial</em> components.</h4>
                    <p><b><em>Essential components</em></b> have been shown to positively impact student learning.<br /><b><em>Beneficial components</em></b> hold promise for positive impact on student learning, but may be more relevant and useful for some reviewers. Beneficial components are marked with a note; all others are essential. You must answer all components.</p>
                    <p>
                        <SaveWorkModal
                            buttonText="How can I save my work?"
                            hasIcon="false" />
                    </p>
                </div>
                <hr className="hr
                                u-mb30
                                u-mt30" />
                <div className="block block__flush-top">
                    <h3 className="h2">
                        <SvgIcon
                            icon={this.props.criterionCompletionStatuses["efficacy-crt-question-1"]}
                            color="green"
                            hasSpaceAfter="true" />
                        Criterion 1: Strength of study (inclusion criteria)
                    </h3>
                    <p className="lead-paragraph">
                        Is the study strong? Only strong studies (those that meet rigorous standards) can be used to determine the efficacy of a curriculum. The inclusion criteria will help you determine whether or not a study meets these standards of a strong study.
                    </p>
                    <p>
                        <b><em>You will answer these questions for each study individually.</em></b>
                    </p>
                                                    
                    {this.getEfficacyStudyItems().map((i) => 
                            <EfficacyStudyComponent key={i} 
                                                    {...this.props} 
                                                    studyCount={i}
                                                    showRemoveButton={i>0}
                                                    criterionAnswerChanged={this.criterionAnswerChanged.bind(this)} />)}

                    <h4 className="h2">Score for [study name]</h4>
                    <div className="m-curriculum-status">
                        <ul className="m-list__unstyled u-mb0">
                            <li className="u-mb30">
                                <div className="m-form-field
                                                m-form-field__radio
                                                m-form-field__display">
                                    <div className="a-label">
                                        <svg className="m-form-field_radio-icon is-active" viewBox="0 0 22 22">
                                            <circle cx="11" cy="11" r="10" className="m-form-field_radio-icon-stroke"></circle>
                                            <circle cx="11" cy="11" r="7" className="m-form-field_radio-icon-fill"></circle>
                                        </svg>
                                        <div className="m-form-field_radio-text is-active">
                                            <div><strong>The study is strong.</strong></div>
                                            All essential components were met.
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="u-mb30">
                                <div className="m-form-field
                                                m-form-field__radio
                                                m-form-field__display">
                                    <div className="a-label">
                                        <svg className="m-form-field_radio-icon" viewBox="0 0 22 22">
                                            <circle cx="11" cy="11" r="10" className="m-form-field_radio-icon-stroke"></circle>
                                            <circle cx="11" cy="11" r="7" className="m-form-field_radio-icon-fill"></circle>
                                        </svg>
                                        <div className="m-form-field_radio-text">
                                            <div><strong>The study is not strong.</strong></div>
                                            Not all essential components were met.
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="m-curriculum-status_components">
                            <p><b>Total number of essential components</b></p>
                            <ul className="m-component-list">
                                <li><b>5</b> Yes</li>
                                <li><b>0</b> No</li>
                            </ul>
                            <p><b>Total number of beneficial components</b></p>
                            <ul className="m-component-list">
                                <li><b>0</b> Yes</li>
                                <li><b>2</b> No</li>
                            </ul>
                        </div>
                    </div>
                    <div className="u-mt15 u-mb30">
                        <button className="a-btn a-btn__link" 
                            onClick={() => this.AddEfficacyStudy()}>
                            Review another study
                            <SvgIcon
                                icon="plus-round"
                                islarge="true"
                                hasSpaceBefore="true" />
                        </button>
                    </div>
                    <button className="a-btn u-mb30">I’m done adding studies</button>
                    <div className="m-notification
                            m-notification__visible
                            m-notification__success">
                        <SvgIcon icon="check-round" />
                        <div className="m-notification_content">
                            <div className="m-notification_message">
                                <p>You don’t need to complete Criteria 2 or 3 and can move on to the efficacy summary.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <CriterionLinkWrapper
                    criterionKey="efficacy-crt-question-2"
                    criterionText="Criterion 2: Saving and investing"
                    hideCriterion={this.shouldHideAdditonalCriterion("efficacy-crt-question-1")}
                    {...this.props}  >
                <div className="block block__flush-top">
                    <h3 className="h2">
                        <SvgIcon
                            icon={this.props.criterionCompletionStatuses["efficacy-crt-question-2"]}
                            color="green"
                            hasSpaceAfter="true" />
                        Criterion 2: Saving and investing
                    </h3>
                    <p className="lead-paragraph">
                        Is there enough evidence (when looking at all the strong studies as a whole) to support the research that this is an effective curriculum?
                    </p>
                    <p>
                        <b><em>Consider all the strong studies together as you answer the remaining questions. Don’t include studies that were not rated strong in Criteria 1.</em></b>
                    </p>
                    <ol className="m-list__unstyled">
                        <EditableCriterionRowWrapper 
                            {...this.props}
                            criterionNumber="2.1"
                            indicatorText="There is sufficient research to judge efficacy." >
                            <EditableSubComponentRow 
                                componentText="Do the evaluations, collectively or individually, include at least 350 students or 14 classrooms?"
                                showBeneficialText="true"
                                showNaButton="false"
                                currentCriterionRefId={this.generateStudyRefId("2.1", "_beneficial")}
                                {...this.props}
                                criterionAnswerChanged={this.criterionAnswerChanged.bind(this)}
                                />
                        </EditableCriterionRowWrapper>
                        <EditableCriterionRowWrapper 
                            {...this.props}
                            criterionNumber="2.2"
                            indicatorText="The studies examine the range of participants and settings for which the curriculum was designed." >
                            <EditableSubComponentRow 
                                    componentText="Do the evaluations, collectively or individually, span the range of participants (e.g., grade levels) and settings (e.g., in class instruction) for which the curriculum was designed?"
                                    showBeneficialText="true"
                                    showNaButton="false"
                                    currentCriterionRefId={this.generateStudyRefId("2.2", "_beneficial")}
                                    {...this.props}
                                    criterionAnswerChanged={this.criterionAnswerChanged.bind(this)}
                                    />
                        </EditableCriterionRowWrapper>
                    </ol>
                    <div className="m-form-field m-form-field__textarea">
                        <label className="a-label a-label__heading" htmlFor="efficacy-crt-notes-optional-2">
                            My notes
                            &nbsp;<small className="a-label_helper">(optional)</small>
                            <small className="a-label_helper a-label_helper__block">
                                Anything you want to note about this criterion? Please do not share any Personally Identifiable Information (PII), including, but not limited to, your name, address, phone number, email address, Social Security number, etc.
                            </small>
                        </label>
                        <textarea className="a-text-input a-text-input__full"
                                    rows="6"
                                    id="efficacy-crt-notes-optional-2"
                                    ref="efficacy-crt-notes-optional-2"
                                    value={this.props.criterionAnswers['efficacy-crt-notes-optional-2']}
                                    onChange={e=>this.criterionAnswerChanged('efficacy-crt-notes-optional-2', e.target.value)} >
                        </textarea>
                    </div>
                </div>
                <CriterionLinkWrapper
                    criterionKey="efficacy-crt-question-3"
                    criterionText="Criterion 3: Impact"
                    {...this.props} >
                <div className="block block__flush-top">
                    <h3 className="h2">
                        <SvgIcon
                            icon={this.props.criterionCompletionStatuses["efficacy-crt-question-3"]}
                            color="green"
                            hasSpaceAfter="true" />
                        Criterion 3: Impact
                    </h3>
                    <p className="lead-paragraph">
                        Is there enough evidence to support conclusions of consistent, strong, positive impact?
                    </p>
                    <p>
                        <b><em>Consider all the strong studies together as you answer the remaining questions. Don’t include studies that were not rated strong in Criteria 1.</em></b>
                    </p>
                    <ol className="m-list__unstyled">

                        <EditableCriterionRowWrapper 
                            {...this.props}
                            criterionNumber="3.1"
                            indicatorText="Positive impacts are statistically significant and substantively important." >

                            <EditableSubComponentRow 
                                componentText="Does at least one evaluation indicate positive effects significant at the 10% level?"
                                showBeneficialText="false"
                                showNaButton="false"
                                currentCriterionRefId={this.generateStudyRefId("3.1", "")}
                                {...this.props}
                                criterionAnswerChanged={this.criterionAnswerChanged.bind(this)}
                                />
                        </EditableCriterionRowWrapper>
                        <EditableCriterionRowWrapper 
                            {...this.props}
                            criterionNumber="3.2"
                            indicatorText="Findings are consistent across studies and context; there is evidence of positive effects with no overriding contrary evidence." >
                            <EditableSubComponentRow 
                                componentText="Do all evaluations indicate either a positive effect or no effect? (i.e., not a statistically significant negative effect)"
                                showBeneficialText="false"
                                showNaButton="false"
                                currentCriterionRefId={this.generateStudyRefId("3.2.1", "")}
                                {...this.props}
                                criterionAnswerChanged={this.criterionAnswerChanged.bind(this)}
                                />
                            <EditableSubComponentRow 
                                componentText="Do at least two evaluations indicate statistically significant positive effects with no evaluation indicating statistically significant negative effects?"
                                showBeneficialText="true"
                                showNaButton="false"
                                currentCriterionRefId={this.generateStudyRefId("3.2.1", "_beneficial")}
                                {...this.props}
                                criterionAnswerChanged={this.criterionAnswerChanged.bind(this)}
                                />
                        </EditableCriterionRowWrapper>

                    </ol>
                    <div className="m-form-field m-form-field__textarea">
                        <label className="a-label a-label__heading" htmlFor="efficacy-crt-notes-optional-3">
                            My notes
                            &nbsp;<small className="a-label_helper">(optional)</small>
                            <small className="a-label_helper a-label_helper__block">
                                Anything you want to note about this criterion? Please do not share any Personally Identifiable Information (PII), including, but not limited to, your name, address, phone number, email address, Social Security number, etc.
                            </small>
                        </label>
                        <textarea className="a-text-input a-text-input__full"
                                    rows="6"
                                    id="efficacy-crt-notes-optional-3"
                                    ref="efficacy-crt-notes-optional-3"
                                    value={this.props.criterionAnswers['efficacy-crt-notes-optional-3']}
                                    onChange={e=>this.criterionAnswerChanged('efficacy-crt-notes-optional-3', e.target.value)} >
                        </textarea>
                    </div>
                </div>
                </CriterionLinkWrapper>
                </CriterionLinkWrapper>
                <div className="l-survey-top">
                    <SaveWorkModal
                        buttonText="Can I save my work?"
                        hasIcon="true" />
                </div>
                <h2 className="h4">You’re Reviewing: <b>{this.props.curriculumTitle}</b></h2>
            </React.Fragment>
        );
    }
}
