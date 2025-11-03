%{
  //  -----------------------------------------------------------------	//
  //									//
  //		ourLisp.lex						//
  //									//
  //	    This file defines a flex file that defines a C++ program	//
  //	that outputs the tokens encountered in a Lisp source file.	//
  //									//
  //	----	----	----	----	----	----	----	----	//
  //									//
  //	Version 1a					Joseph Phillips	//
  //									//
  //  -----------------------------------------------------------------	//

  //  Compile and run with:
  //    $ flex -o ourLisp.cpp ourLisp.lex
  //    $ g++ ourLisp.cpp -o ourLisp
  //    $ ./ourLisp mergeSort.lisp

#include	<cstdlib>
#include	<cstdio>
#include	<cstring>
#include    <cctype>


//  PURPOSE:  To distinguish among the tokens that can be tokenized.
typedef		enum
		{
		  NO_LEX,

		  BEGIN_PAREN,
		  END_PAREN,

		  INTEGER_LEX,
		  FLOAT_LEX,
		  STRING_CONST_LEX,
		  KEYWORD_LEX,
		  IDENTIFIER_LEX,

		  IF_LEX,
		  COND_LEX,
		  CASE_LEX,
		  LOOP_LEX,
		  DO_LEX,
		  DOLIST_LEX,
		  DOTIMES_LEX,
		  BLOCK_LEX,
		  RETURN_FROM_LEX,
		  CATCH_LEX,
		  THROW_LEX,
		  TAGBODY_LEX,
		  GO_LEX,
		  LET_LEX,
		  LET_STAR_LEX,
		  SETF_LEX,
		  DEFVAR_LEX,
		  DEFPARAMETER_LEX,
		  DEFCONSTANT_LEX,
		  DEFUN_LEX,
		  LAMBDA_LEX,
		  LABELS_LEX,
		  FLET_LEX,
		  MACROLET_LEX,
		  DEFCLASS_LEX,
		  DEFMETHOD_LEX,
		  DEFGENERIC_LEX,
		  MAKE_INSTANCE_LEX,
		  QUOTE_LEX,
		  FUNCTION_LEX,
		  EVAL_LEX,
		  PROGN_LEX,
		  UNWIND_PROTECT_LEX,
		  PLUS_LEX,
		  MINUS_LEX,
		  STAR_LEX,
		  SLASH_LEX,
		  ABS_LEX,
		  SQRT_LEX,
		  MOD_LEX,
		  REM_LEX,
		  EQUAL_SYM_LEX,
		  LESSER_THAN_LEX,
		  GREATER_THAN_LEX,
		  LESSER_EQUAL_LEX,
		  GREATER_EQUAL_LEX,
		  EQ_LEX,
		  EQL_LEX,
		  EQUAL_LEX,
		  EQUALP_LEX,
		  CAR_LEX,
		  CDR_LEX,
		  CONS_LEX,
		  LIST_LEX,
		  APPEND_LEX,
		  NCONC_LEX,
		  LENGTH_LEX,
		  NTH_LEX,
		  MEMBER_LEX,
		  ASSOC_LEX,
		  STRING_LEX,
		  CHAR_LEX,
		  SUBSEQ_LEX,
		  STRING_UPCASE_LEX,
		  STRING_DOWNCASE_LEX,
		  READ_LEX,
		  PRINT_LEX,
		  FORMAT_LEX,
		  OPEN_LEX,
		  CLOSE_LEX,
		  SYMBOLP_LEX,
		  NUMBERP_LEX,
		  LISTP_LEX,
		  STRINGP_LEX,
		  ARRAYP_LEX,
		  FUNCTIONP_LEX,
		  NULL_LEX
		}
		lex_ty;


//  PURPOSE:  To tell the size of typical buffers.
const int	BUFFER_LEN		= 4080;


//  PURPOSE:  To tell how many spaces are implied by a tab char.
const int	NUM_SPACES_PER_TAB	= 8;


//  PURPOSE:  To keep track of the line number.
extern int	lineNum;

#undef 		YY_INPUT

#define		YY_INPUT(buffer,numRetChars,bufferLen)	\
		{ numRetChars = getLexChar(buffer,bufferLen); }


//  PURPOSE:  To read the next char from 'yyin' and put it into 'buffer' of
//	length 'bufferLen'.  Returns '1' to signify that only one char was
//	obtained on success, or returns 'YY_NULL' on EOF error otherwise.
extern
int		getLexChar	(char*		buffer,
       				 int		bufferLen
				);

%}



%%

";"[^\n]*                {  }

\n                      { lineNum++; }

[ \t\r]+                {  }

"("                     { return(BEGIN_PAREN); }
")"                     { return(END_PAREN); }

"<="                    { return(LESSER_EQUAL_LEX); }
">="                    { return(GREATER_EQUAL_LEX); }

"<"                     { return(LESSER_THAN_LEX); }
">"                     { return(GREATER_THAN_LEX); }
"="                     { return(EQUAL_SYM_LEX); }

"+"                     { return(PLUS_LEX); }
"-"                     { return(MINUS_LEX); }
"*"                     { return(STAR_LEX); }
"/"                     { return(SLASH_LEX); }

([0-9]+\.[0-9]*([eE][+-]?[0-9]+)?)|([0-9]+[eE][+-]?[0-9]+)   { return(FLOAT_LEX); }

[0-9]+                  { return(INTEGER_LEX); }

\"([^\"\\]|\\.)*\"      { return(STRING_CONST_LEX); }

:[A-Za-z_][A-Za-z0-9_+\-*/?!$%&<=>@^~.]*    { return(KEYWORD_LEX); }

[A-Za-z_][A-Za-z0-9_+\-*/?!$%&<=>@^~.]*    {
    static char lowbuf[BUFFER_LEN];
    int i;
    for (i = 0; yytext[i] && i < BUFFER_LEN - 1; ++i) {
        lowbuf[i] = (char) tolower((unsigned char) yytext[i]);
    }
    lowbuf[i] = '\0';

    if (strcmp(lowbuf,"if")==0) return(IF_LEX);
    else if (strcmp(lowbuf,"cond")==0) return(COND_LEX);
    else if (strcmp(lowbuf,"case")==0) return(CASE_LEX);
    else if (strcmp(lowbuf,"loop")==0) return(LOOP_LEX);
    else if (strcmp(lowbuf,"do")==0) return(DO_LEX);
    else if (strcmp(lowbuf,"dolist")==0) return(DOLIST_LEX);
    else if (strcmp(lowbuf,"dotimes")==0) return(DOTIMES_LEX);
    else if (strcmp(lowbuf,"block")==0) return(BLOCK_LEX);
    else if (strcmp(lowbuf,"return-from")==0) return(RETURN_FROM_LEX);
    else if (strcmp(lowbuf,"catch")==0) return(CATCH_LEX);
    else if (strcmp(lowbuf,"throw")==0) return(THROW_LEX);
    else if (strcmp(lowbuf,"tagbody")==0) return(TAGBODY_LEX);
    else if (strcmp(lowbuf,"go")==0) return(GO_LEX);
    else if (strcmp(lowbuf,"let*")==0) return(LET_STAR_LEX);
    else if (strcmp(lowbuf,"let")==0) return(LET_LEX);
    else if (strcmp(lowbuf,"setf")==0) return(SETF_LEX);
    else if (strcmp(lowbuf,"defvar")==0) return(DEFVAR_LEX);
    else if (strcmp(lowbuf,"defparameter")==0) return(DEFPARAMETER_LEX);
    else if (strcmp(lowbuf,"defconstant")==0) return(DEFCONSTANT_LEX);
    else if (strcmp(lowbuf,"defun")==0) return(DEFUN_LEX);
    else if (strcmp(lowbuf,"lambda")==0) return(LAMBDA_LEX);
    else if (strcmp(lowbuf,"labels")==0) return(LABELS_LEX);
    else if (strcmp(lowbuf,"flet")==0) return(FLET_LEX);
    else if (strcmp(lowbuf,"macrolet")==0) return(MACROLET_LEX);
    else if (strcmp(lowbuf,"defclass")==0) return(DEFCLASS_LEX);
    else if (strcmp(lowbuf,"defmethod")==0) return(DEFMETHOD_LEX);
    else if (strcmp(lowbuf,"defgeneric")==0) return(DEFGENERIC_LEX);
    else if (strcmp(lowbuf,"make-instance")==0) return(MAKE_INSTANCE_LEX);
    else if (strcmp(lowbuf,"quote")==0) return(QUOTE_LEX);
    else if (strcmp(lowbuf,"function")==0) return(FUNCTION_LEX);
    else if (strcmp(lowbuf,"eval")==0) return(EVAL_LEX);
    else if (strcmp(lowbuf,"progn")==0) return(PROGN_LEX);
    else if (strcmp(lowbuf,"unwind-protect")==0) return(UNWIND_PROTECT_LEX);
    else if (strcmp(lowbuf,"abs")==0) return(ABS_LEX);
    else if (strcmp(lowbuf,"sqrt")==0) return(SQRT_LEX);
    else if (strcmp(lowbuf,"mod")==0) return(MOD_LEX);
    else if (strcmp(lowbuf,"rem")==0) return(REM_LEX);
    else if (strcmp(lowbuf,"eq")==0) return(EQ_LEX);
    else if (strcmp(lowbuf,"eql")==0) return(EQL_LEX);
    else if (strcmp(lowbuf,"equal")==0) return(EQUAL_LEX);
    else if (strcmp(lowbuf,"equalp")==0) return(EQUALP_LEX);
    else if (strcmp(lowbuf,"car")==0) return(CAR_LEX);
    else if (strcmp(lowbuf,"cdr")==0) return(CDR_LEX);
    else if (strcmp(lowbuf,"cons")==0) return(CONS_LEX);
    else if (strcmp(lowbuf,"list")==0) return(LIST_LEX);
    else if (strcmp(lowbuf,"append")==0) return(APPEND_LEX);
    else if (strcmp(lowbuf,"nconc")==0) return(NCONC_LEX);
    else if (strcmp(lowbuf,"length")==0) return(LENGTH_LEX);
    else if (strcmp(lowbuf,"nth")==0) return(NTH_LEX);
    else if (strcmp(lowbuf,"member")==0) return(MEMBER_LEX);
    else if (strcmp(lowbuf,"assoc")==0) return(ASSOC_LEX);
    else if (strcmp(lowbuf,"string")==0) return(STRING_LEX);
    else if (strcmp(lowbuf,"char")==0) return(CHAR_LEX);
    else if (strcmp(lowbuf,"subseq")==0) return(SUBSEQ_LEX);
    else if (strcmp(lowbuf,"string-upcase")==0) return(STRING_UPCASE_LEX);
    else if (strcmp(lowbuf,"string-downcase")==0) return(STRING_DOWNCASE_LEX);
    else if (strcmp(lowbuf,"read")==0) return(READ_LEX);
    else if (strcmp(lowbuf,"print")==0) return(PRINT_LEX);
    else if (strcmp(lowbuf,"format")==0) return(FORMAT_LEX);
    else if (strcmp(lowbuf,"open")==0) return(OPEN_LEX);
    else if (strcmp(lowbuf,"close")==0) return(CLOSE_LEX);
    else if (strcmp(lowbuf,"symbolp")==0) return(SYMBOLP_LEX);
    else if (strcmp(lowbuf,"numberp")==0) return(NUMBERP_LEX);
    else if (strcmp(lowbuf,"listp")==0) return(LISTP_LEX);
    else if (strcmp(lowbuf,"stringp")==0) return(STRINGP_LEX);
    else if (strcmp(lowbuf,"arrayp")==0) return(ARRAYP_LEX);
    else if (strcmp(lowbuf,"functionp")==0) return(FUNCTIONP_LEX);
    else if (strcmp(lowbuf,"null")==0) return(NULL_LEX);

    return(IDENTIFIER_LEX);
}

.                       { printf("What is %c?\n",yytext[0]); return(0); }

%%

//  PURPOSE:  To hold the names of the tokens given in 'lex_ty'.
const char*	lexTypeName[]	= { "not a legal lexeme",

      				    "(",
				    ")",

				    "INTEGER",
				    "FLOAT",
				    "STRING",
				    "KEYWORD",
				    "IDENTIFIER",

				    "if",
				    "cond",
				    "case",
				    "loop",
				    "do",
				    "dolist",
				    "dotimes",
				    "block",
				    "return-from",
				    "catch",
				    "throw",
				    "tagbody",
				    "go",
				    "let",
				    "let*",
				    "setf",
				    "defvar",
				    "defparameter",
				    "defconstant",
				    "defun",
				    "lambda",
				    "labels",
				    "flet",
				    "macrolet",
				    "defclass",
				    "defmethod",
				    "defgeneric",
				    "make-instance",
				    "quote",
				    "function",
				    "eval",
				    "progn",
				    "unwind-protect",
				    "+",
				    "-",
				    "*",
				    "/",
				    "abs",
				    "sqrt",
				    "mod",
				    "rem",
				    "=",
				    "<",
				    ">",
				    "<=",
				    ">=",
				    "eq",
				    "eql",
				    "equal",
				    "equalp",
				    "car",
				    "cdr",
				    "cons",
				    "list",
				    "append",
				    "nconc",
				    "length",
				    "nth",
				    "member",
				    "assoc",
				    "string",
				    "char",
				    "subseq",
				    "string-upcase",
				    "string-downcase",
				    "read",
				    "print",
				    "format",
				    "open",
				    "close",
				    "symbolp",
				    "numberp",
				    "listp",
				    "stringp",
				    "arrayp",
				    "functionp",
				    "null"
				  };


//  PURPOSE:  To keep track of the line number.
int		lineNum		= 0;

//  PURPOSE:  To read the next char from 'yyin' and put it into 'buffer' of
//	length 'bufferLen'.  Returns '1' to signify that only one char was
//	obtained on success, or returns 'YY_NULL' on EOF error otherwise.
int		getLexChar	(char*	buffer,
       				 int	bufferLen
				)
{
  //  PURPOSE:  To hold the chars of the most recently read line:
  static
  char		line[BUFFER_LEN];

  //  PURPOSE:  To hold the position of the next char to read in 'linePtr',
  //	or 'line + BUFFER_LEN' if should read a new line.
  static
  char*		linePtr	= line + BUFFER_LEN;


  //  I.  Application validity check:

  //  II.  Get next char:
  //  II.A.  If at end of current line then keep reading lines:
  while  ( (linePtr >= line + BUFFER_LEN)  ||  (*linePtr == '\0') )
  {
    //  II.A.1.  Read next line:
    if  (fgets(line,BUFFER_LEN,yyin) == NULL)
    {
      //  II.A.1.a. Give up if no more lines:
      return(YY_NULL);
    }

    //  II.A.2.  Reset 'linePtr':
    linePtr = line;
  }

  //  II.B.  Update 'buffer'
  buffer[0]	= *linePtr++;
  buffer[1]	= '\0';

  //  III.  Finished:
  return(1);
}


//  PURPOSE:  To return '0' if tokenizing should continue after reaching feof()
//	on 'yyin', or '1' otherwise.  No parameters.
int		yywrap		()
{
  //  I.  Application validity check:

  //  II.  Return value:
  return(1);
}


//  PURPOSE:  To tokenize the Lisp program given as the first argument in
//	'argv[1]'.  Returns 'EXIT_SUCCESS' on success or 'EXIT_FAILURE'
//	otherwise.
int		main		(int argc, char* argv[])
{
  //  I.  Application validity check:
  if  (argc < 2)
  {
    fprintf(stderr,"Usage:\tourLisp <prog.lisp>\n");
    exit(EXIT_FAILURE);
  }

  //  II.  Attempt to tokenize file:
  //  II.A.  Attempt to open file:
  const char*	filePathCPtr	= argv[1];

  if  ((yyin = fopen(filePathCPtr,"r")) == NULL)
  {
    fprintf(stderr,"Cannot open %s\n",filePathCPtr);
    exit(EXIT_FAILURE);
  }

  //  II.B.  Attempt to tokenize 'filePathCPtr':
  int	result;

  //  II.B.1.  Each iteration gets and prints the next token:
  while  ( (result = yylex()) != YY_NULL )
  {
    printf("%s",lexTypeName[result]);

    switch  (result)
    {
    case INTEGER_LEX :
      printf(":\t%d",strtol(yytext,NULL,0));
      break;

    case FLOAT_LEX :
      printf(":\t\t%g",strtod(yytext,NULL));
      break;

    case STRING_CONST_LEX :
      printf(":\t\t%s",yytext);
      break;

    case KEYWORD_LEX :
      printf(":\t%s",yytext);
      break;

    case IDENTIFIER_LEX :
      printf(":\t%s",yytext);
      break;

    default :
      break;
    }

    putchar('\n');
  }

  //  II.C.  Clean up:
  fclose(yyin);

  //  III.  Finished:
  return(EXIT_SUCCESS);
}