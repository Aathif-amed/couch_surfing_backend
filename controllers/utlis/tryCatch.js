const tryCatch= (controller)=>{
    return async(req,res)=>{
        try {
            await controller(req,res)
        }  catch (error) {
            console.log(error);
            return res.status(500).json({
              success: false,
              message: 'Something Went Wrong..!',
            });
          }
    }
}

export default tryCatch