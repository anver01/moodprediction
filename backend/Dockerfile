# Pull base lambda python3.8 docker image
FROM public.ecr.aws/lambda/python:3.8

# Copy python requirements file
COPY requirements.txt .

# Install the python packages
RUN pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

# Copy function code
COPY app.py ${LAMBDA_TASK_ROOT}
COPY model.py ${LAMBDA_TASK_ROOT}
COPY myscript.py ${LAMBDA_TASK_ROOT}
COPY model.json ${LAMBDA_TASK_ROOT}
COPY Final_model.h5 ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.lambda_handler" ]