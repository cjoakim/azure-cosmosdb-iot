function main(x)
{
    try {
        v = 1; // or some code
 
        return { value = v, error = null }
     }
     catch(e)
     {
         return {value = null, error = e, data = x};
     }
}
