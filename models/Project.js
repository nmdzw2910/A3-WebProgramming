const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true
  },
  studentid:{
      type:String,
      required: true
  },
  studentyear:{
        type:String,
        required:true
  },
  course: {
    type: String,
    required: true
  },
  courseid: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  assignment: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  percentage: {
    type: String,
    required: true
  },
  technologyuse: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  application: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
