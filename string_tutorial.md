

The Terminator Trick With Solidity Strings


In the course of programming in Solidity, you will want to interact with strings early on. After all, strings are the most interesting data types to interact with, and the most helpful, when you want to debug your programs.

As a programmer, you likely know how strings work already. Sure, solidity is more C-like in that it doesn't have the nice javascript/python string functions like length, concatenation, etcetera, but it's just about that, right? Nothing unexpected? We will see C !

First, lets go through the official documentation, and see what it has to say on strings. The available documentation on strings is relatively limited. On the page for data types in Solidity, under the sub-heading of 'Dynamically-sized byte arrays', the documentation says the following:

http://solidity.readthedocs.io/en/develop/types.html


#### Dynamically-sized byte array

`
String:
    Dynamically-sized UTF-8-encoded string, see Arrays. Not a value-type!

As a rule of thumb, use bytes for arbitrary-length raw byte data and string for arbitrary-length string (UTF-8) data.
`

Okay. What do we know from this? That strings are dynamic byte arrays, and it's (probably) not a good idea to store raw bytes in there. But of course, we're experienced programmers, why would we ever store raw bytes as strings anyway right?

Maybe we missed out some interesting behavior of arrays though? Since strings are also arrays, we should look into the documentation for arrays.

http://solidity.readthedocs.io/en/develop/types.html#arrays

`
Arrays can have a compile-time fixed size or they can be dynamic. For storage arrays, the element type can be arbitrary (i.e. also other arrays, mappings or structs). For memory arrays, it cannot be a mapping and has to be an ABI type if it is an argument of a publicly-visible function.
`

Nothing off or unexpected there. So let's see if we can do something unexpected here. A spoiler alert of sorts for C programmers: we will be testing how solidity handles string termination.

First, lets construct an interesting string to play with. 

Type the following lines in the console (browser or nodejs) and look at the result.
`
let str_arr = [ "A", "P", "P", "\u0000", "L", "E" ]
let joined_str = str_arr.join('');
console.log(joined_str)
console.log(str_arr.length)
`

It prints out "APPLE" but with a weird character in beterrn. Nothing outrageous there, right?

We see that the length of the string is six characters. All good there.

Now write the most basic solidity program to store and retrieve a string. Use the samples you have from previous chapters if you must! It can be as simple as the following. It won't work in its current form, but it's a good point to start from!

```
pragma solidity ^0.4.18;
contract test_string {

    string string_to_test;
    
    function set_string(string toset){
        string_to_test = toset;
    }
    
    function get_string() returns (string){
        return string_to_test;
    }
    
    function test_string(){
        string_to_test="";
    }
}
```

Now try setting the string in your contract to the string `joined_str`. Make sure it goes through, with no errors. Now retrieve it by using it the getter function. Print out its length. Print it out in the console.

https://news.ycombinator.com/item?id=3906755


https://news.ycombinator.com/item?id=13973174
