export function validate(inputs) {
  const error = {};
  const notSimbols = /^[a-zA-ZñÑ0-9\s][a-zA-ZñÑ0-9\s]*$/;
  const onlyUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 

  if (inputs.name !== "" && !notSimbols.test(inputs.name))
    error.name = "Only alphanumeric characters are allowed";
    
  if (inputs.name.length > 70) 
    error.name = "Maximum of 70 characters";

  if (inputs.image.length > 0 && !onlyUrl.test(inputs.image))
    error.image = "The URL of this image is not recognized";

  if (inputs.image.length > 300) error.image = "URL exceeds max 300 characters";

  if (inputs.description.length > 550)
    error.description = "Description exceeds the 550 character limit";

  if (inputs.launched !== "" && !dateRegex.test(inputs.launched))
    error.launched = "Invalid date format. Expected format: DD-MM-YYYY";

  return error;
}
