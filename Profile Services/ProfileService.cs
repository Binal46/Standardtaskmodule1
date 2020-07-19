using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;
using static Talent.Services.Profile.Handler.MyContext;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        public bool AddNewLanguage(AddLanguageViewModel language)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        
        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            //Your code here;
            User profile = await _userRepository.GetByIdAsync(Id);
           
            var videoUrl = "";
            var PhotoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)

                          ? ""

                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);
                PhotoUrl = string.IsNullOrWhiteSpace(profile.ProfilePhoto)

                          ? ""

                          : await _fileService.GetFileURL(profile.ProfilePhoto, FileType.ProfilePhoto);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var Languages = profile.Languages.Select(x => ViewModelFromLanguage(x)).ToList();

                var Education = profile.Education.Select(x => ViewModelFromEducation(x)).ToList();

                var Certifications = profile.Certifications.Select(x => ViewModelFromCertification(x)).ToList();

                var Experience = profile.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                // 
               // var LinkedAccounts = new LinkedAccounts();

                var result = new TalentProfileViewModel
                {
                    Id = profile.Id,

                    FirstName = profile.FirstName,

                    MiddleName = profile.MiddleName,

                    LastName = profile.LastName,

                    Gender = profile.Gender,

                    Email = profile.Email,

                    Phone = profile.Phone,

                    MobilePhone = profile.MobilePhone,

                    IsMobilePhoneVerified = profile.IsMobilePhoneVerified,

                    Address = profile.Address,

                    Nationality = profile.Nationality,

                    VisaStatus = profile.VisaStatus,

                    JobSeekingStatus = profile.JobSeekingStatus,

                    VisaExpiryDate = profile.VisaExpiryDate,

                    Summary = profile.Summary,

                    Description = profile.Description,

                    Skills = skills,

                    Languages = Languages,

                    Experience = Experience,

                    VideoUrl = videoUrl,

                    VideoName = profile.VideoName,

                    Certifications = Certifications,

                    ProfilePhoto = profile.ProfilePhoto,

                    ProfilePhotoUrl = PhotoUrl,

                    CvName = profile.CvName,

                    CvUrl = profile.CvName,

                    LinkedAccounts = profile.LinkedAccounts,
                };
                return result;
            }

                return null;
            //throw new NotImplementedException();
        }


        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
           
            //Your code here;
            try
            {
                if(model.Id != null)
                {
                    User existingUser = await _userRepository.GetByIdAsync(model.Id);

                    existingUser.FirstName = model.FirstName;

                    existingUser.MiddleName = model.MiddleName;

                    existingUser.LastName = model.LastName;

                    existingUser.Gender = model.Gender;

                    existingUser.Email = model.Email;

                    existingUser.Phone = model.Phone;

                    existingUser.MobilePhone = model.MobilePhone;

                    existingUser.Address = model.Address;

                    existingUser.Nationality = model.Nationality;

                    existingUser.VisaStatus = model.VisaStatus;

                    existingUser.JobSeekingStatus = model.JobSeekingStatus;

                    existingUser.VisaExpiryDate = model.VisaExpiryDate;

                    existingUser.Summary = model.Summary;

                    existingUser.Description = model.Description;

                    existingUser.LinkedAccounts = model.LinkedAccounts;
                    
                    existingUser.ProfilePhoto = model.ProfilePhoto;
                    
                    existingUser.ProfilePhotoUrl = model.ProfilePhotoUrl;


                    // For Skills
                    var newSkills = new List<UserSkill>();
                    foreach (var item in model.Skills)
                    {
                        if (string.IsNullOrEmpty(item.Id))
                        {
                            item.Id = ObjectId.GenerateNewId().ToString();
                        }
                        newSkills.Add(new UserSkill
                        {
                            Id = item.Id,
                            IsDeleted = item.IsDeleted,
                            Skill = item.Name,
                            ExperienceLevel = item.Level,
                            UserId = item.UserId

                        }
                        );

                    }
                    existingUser.Skills = newSkills;


                    // For Language
                    var newLanguages = new List<UserLanguage>();
                    foreach (var item in model.Languages)
                    {
                        if (string.IsNullOrEmpty(item.Id))
                        {
                            item.Id = ObjectId.GenerateNewId().ToString();
                        }
                        newLanguages.Add(new UserLanguage
                        {
                            Id = item.Id,
                            IsDeleted = item.IsDeleted,
                            Language = item.Name,
                            LanguageLevel = item.Level,
                            UserId = item.CurrentUserId

                        }
                        );

                    }
                    existingUser.Languages = newLanguages;


                    // For Experience
                    var newExperience = new List<UserExperience>();
                    foreach (var item in model.Experience)
                    {
                        if (string.IsNullOrEmpty(item.Id))
                        {
                            item.Id = ObjectId.GenerateNewId().ToString();
                        }
                        newExperience.Add(new UserExperience
                        {
                            Id = item.Id,
                            Company = item.Company,
                            Position = item.Position,
                            Start = item.Start,
                            End = item.End,
                            Responsibilities = item.Responsibilities

                        }
                        );

                    }
                    existingUser.Experience = newExperience;


                    await _userRepository.Update(existingUser);
                    return true;
                }
                return false;
            }
            catch (MongoException)
            {
                return false;
            }

            // throw new NotImplementedException();
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            

                var fileExtension = Path.GetExtension(file.FileName);
                List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

                if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
                {
                    return false;
                }

                var profile = (await _userRepository.Get(x => x.Id == talentId)).SingleOrDefault();

                if (profile == null)
                {
                    return false;
                }

                var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

                if (!string.IsNullOrWhiteSpace(newFileName))
                {
                    var oldFileName = profile.ProfilePhoto;

                    if (!string.IsNullOrWhiteSpace(oldFileName))
                    {
                        await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                    }

                    profile.ProfilePhoto = newFileName;
                    profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                    await _userRepository.Update(profile);
                    return true;
                }

                return false;
            
        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            try
            {
                var profile = await _employerRepository.GetByIdAsync(employerOrJobId);
                var talentList = _userRepository.GetQueryable().Skip(position).Take(increment).AsEnumerable();
                if (profile != null)
                {
                    var result = new List<TalentSnapshotViewModel>();

                    //line 527         
                    //foreach (var item in talentList)
                    {
                        var newItem = new TalentSnapshotViewModel();
                        //newItem.Id = item.Id;
                       

                        // more lines assigning data
                        result.Add(newItem);
                    }
                    return result;
                }
                return null;
            }
            catch (Exception)
            {
                return null;

            }
            }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }



        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage language)
        {

            return new AddLanguageViewModel
            {
                Id = language.Id,
                Level = language.LanguageLevel,
                Name = language.Language
            };
        }

        
        protected AddEducationViewModel ViewModelFromEducation(UserEducation education)
        {

            throw new NotImplementedException();
        }

        protected AddCertificationViewModel ViewModelFromCertification(UserCertification certification)
        {

            throw new NotImplementedException();
        }

        
        protected ExperienceViewModel ViewModelFromExperience(UserExperience experience)
        {

            return new ExperienceViewModel
            {
                Id = experience.Id,
                Company = experience.Company,
                Position = experience.Position,
                Start = experience.Start,
                End = experience.End,
                Responsibilities = experience.Responsibilities

            };
        }
        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
