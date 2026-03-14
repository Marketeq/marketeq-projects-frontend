import { Given, Then, When } from "@cucumber/cucumber"
import { AboutMePage } from "tests/pages/complete-my-profile/aboutMePage"
import { CompleteProfilePage } from "tests/pages/complete-my-profile/completeProfilePage"
import { EducationFormPage } from "tests/pages/complete-my-profile/educationFormPage"
import { EducationPage } from "tests/pages/complete-my-profile/educationPage"
import { JobTitleAndRateFormPage } from "tests/pages/complete-my-profile/jobTitleAndRateFormPage"
import { JobTitleAndRatePage } from "tests/pages/complete-my-profile/jobTitleAndRatePage"
import { PortfolioPage } from "tests/pages/complete-my-profile/portfolioPage"
import { SkillsPage } from "tests/pages/complete-my-profile/skillsPage"
import { WorkExperienceFormPage } from "tests/pages/complete-my-profile/workExperienceFormPage"
import { WorkExperiencePage } from "tests/pages/complete-my-profile/workExperiencePage"

Given("I am on my profile page", async function (this: any) {
  const profilePage = new CompleteProfilePage(this.page)
  await profilePage.navigateToCompleteProfile()
  await profilePage.clickCompleteMyProfile()
  console.log("Complete My Profile Button is clicked!")
  await profilePage.verifyDialogIsVisible()
  console.log("Dialog Window is displayed!")
})

// **************************************
// Add a new bio successfully
// **************************************
Given("I click on About Me - Finish This Step", async function () {
  const onboardingSteps = new CompleteProfilePage(this.page)
  await onboardingSteps.aboutMe.click()
})

When("I enter a valid bio", async function () {
  const aboutMeStep = new AboutMePage(this.page)
  await aboutMeStep.isVisible()
  await aboutMeStep.enterText()
})

When("I save the new bio", async function () {
  const aboutMeStep = new AboutMePage(this.page)
  await aboutMeStep.clickContinue()
})

Then("The first step is displayed as Done", async function () {
  const aboutMeStep = new AboutMePage(this.page)
  await aboutMeStep.closeButton.click()
  const profilePage = new CompleteProfilePage(this.page)
  await profilePage.verifyStepIsComplete("About Me")
})

// **************************************
// Add a new portfolio successfully
// **************************************
Given("I click on Portfolio - Finish This Step", async function () {
  const onboardingSteps = new CompleteProfilePage(this.page)
  await onboardingSteps.portfolio.click()
})

When("I enter a valid portfolio", async function () {
  const portfolio = new PortfolioPage(this.page)
  await portfolio.addPortfolio()
})

When("I save the new portfolio", async function () {
  const portfolio = new PortfolioPage(this.page)
  await portfolio.clickContinue()
})

Then("The second step is displayed as Done", async function () {
  const portfolioStep = new PortfolioPage(this.page)
  await portfolioStep.closeButton.click()
  const profilePage = new CompleteProfilePage(this.page)
  await profilePage.verifyStepIsComplete("Portfolio")
})

// **************************************
// Add a new skill successfully
// **************************************
Given("I click on Skills - Finish This Step", async function () {
  const onboardingSteps = new CompleteProfilePage(this.page)
  await onboardingSteps.skills.click()
})

When("I add the skill {string}", async function (this: any, skill: string) {
  const page = new SkillsPage(this.page)
  await page.addSkill(skill)
})

When("I save the new skill", async function () {
  const skillStep = new SkillsPage(this.page)
  await skillStep.clickContinue()
})

Then("The third step is displayed as Done", async function () {
  const skillStep = new SkillsPage(this.page)
  await skillStep.closeButton.click()
  const profilePage = new CompleteProfilePage(this.page)
  await profilePage.verifyStepIsComplete("Skills")
})

// **************************************
// Add a new work experience successfully
// **************************************
Given("I click on Work Experience - Finish This Step", async function () {
  const onboardingSteps = new CompleteProfilePage(this.page)
  await onboardingSteps.workExperience.click()
})

When("I click on add a work experience", async function () {
  const addWork = new WorkExperiencePage(this.page)
  await addWork.addworkExperience()
})

When("I fill in the work experience form", async function (this: any) {
  const page = new WorkExperienceFormPage(this.page)
  await page.fillWorkExperienceForm({
    employer: "Marketeq",
    jobTitle: "CEO",
    startMonth: "1",
    startYear: "2020",
    endMonth: "3",
    endYear: "2023",
    jobDescription: "Led the company to success.",
    skills: "Max",
  })
  await page.clickSave()
})

Then("The fourth step is displayed as Done", async function () {
  const workExpStep = new WorkExperiencePage(this.page)
  await workExpStep.closeButton.click()
  const profilePage = new CompleteProfilePage(this.page)
  await profilePage.verifyStepIsComplete("Work Experience")
})

// **************************************
// Add a new education successfully
// **************************************
Given("I click on Education - Finish This Step", async function () {
  const onboardingSteps = new CompleteProfilePage(this.page)
  await onboardingSteps.education.click()
})

When("I click on add education", async function () {
  const addEducation = new EducationPage(this.page)
  await addEducation.addEducation()
})

When("I fill in the education form", async function () {
  const page = new EducationFormPage(this.page)
  await page.fillEducationForm({
    schoolName: "Harvard University",
    degree: "Master",
    major: "Machine Learning",
    startMonth: "January",
    startYear: "2021",
    endMonth: "February",
    endYear: "2025",
    currentlyAttending: false,
  })
  await page.clickSave()
})

Then("The fifth step is displayed as Done", async function () {
  const educationStep = new EducationPage(this.page)
  await educationStep.closeButton.click()
  const profilePage = new CompleteProfilePage(this.page)
  await profilePage.verifyStepIsComplete("Education")
})

// **************************************
// Add a job title and rate successfully
// **************************************
Given("I click on Job Title & Rate - Finish This Step", async function () {
  const onboardingSteps = new CompleteProfilePage(this.page)
  await onboardingSteps.jobTitleAndRate.click()
})

When("I click on add job title", async function () {
  const addJobTitle = new JobTitleAndRatePage(this.page)
  await addJobTitle.addJobTitleAndRate()
})

When("I fill in the job title form", async function () {
  const page = new JobTitleAndRateFormPage(this.page)
  await page.fillJobTitleAndRateForm({
    jobTitle: "Harvard University",
    defaultJobTitle: false,
    clientRate: "85",
    yourEarnings: "65",
  })
  await page.clickSave()
})

Then("The sixth step is displayed as Done", async function () {
  const jobTitleStep = new JobTitleAndRatePage(this.page)
  await jobTitleStep.closeButton.click()
  const profilePage = new CompleteProfilePage(this.page)
  await profilePage.verifyStepIsComplete("Job Title & Rate")
})
