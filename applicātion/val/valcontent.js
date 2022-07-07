function validate()
{
  var t= document.test.title.value;
  var d=document.test.des.value;
  var p=document.test.price.value;
  if(t==="" || d===""  || p=="")
  {
   alert("please enter all fields");
    return false;
  }
  else
  {return true;}
}