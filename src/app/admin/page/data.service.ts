

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PAGE_TYPES } from '../core/reflection.service';

const NAMES = ['AARON', 'ABDUL', 'ABE', 'ABEL', 'ABRAHAM', 'ABRAM', 'ADALBERTO', 'ADAM', 'ADAN', 'ADOLFO', 'ADOLPH', 'ADRIAN', 'AGUSTIN', 'AHMAD', 'AHMED', 'AL', 'ALAN', 'ALBERT', 'ALBERTO', 'ALDEN', 'ALDO', 'ALEC', 'ALEJANDRO', 'ALEX', 'ALEXANDER', 'ALEXIS', 'ALFONSO', 'ALFONZO', 'ALFRED', 'ALFREDO', 'ALI', 'ALLAN', 'ALLEN', 'ALONSO', 'ALONZO', 'ALPHONSE', 'ALPHONSO', 'ALTON', 'ALVA', 'ALVARO', 'ALVIN', 'AMADO', 'AMBROSE', 'AMOS', 'ANDERSON', 'ANDRE', 'ANDREA', 'ANDREAS', 'ANDRES', 'ANDREW', 'ANDY', 'ANGEL', 'ANGELO', 'ANIBAL', 'ANTHONY', 'ANTIONE', 'ANTOINE', 'ANTON', 'ANTONE', 'ANTONIA', 'ANTONIO', 'ANTONY', 'ANTWAN', 'ARCHIE', 'ARDEN', 'ARIEL', 'ARLEN', 'ARLIE', 'ARMAND', 'ARMANDO', 'ARNOLD', 'ARNOLDO', 'ARNULFO', 'ARON', 'ARRON', 'ART', 'ARTHUR', 'ARTURO', 'ASA', 'ASHLEY', 'AUBREY', 'AUGUST', 'AUGUSTINE', 'AUGUSTUS', 'AURELIO', 'AUSTIN', 'AVERY', 'BARNEY', 'BARRETT', 'BARRY', 'BART', 'BARTON', 'BASIL', 'BEAU', 'BEN', 'BENEDICT', 'BENITO', 'BENJAMIN', 'BENNETT', 'BENNIE', 'BENNY', 'BENTON', 'BERNARD', 'BERNARDO', 'BERNIE', 'BERRY', 'BERT', 'BERTRAM', 'BILL', 'BILLIE', 'BILLY', 'BLAINE', 'BLAIR', 'BLAKE', 'BO', 'BOB', 'BOBBIE', 'BOBBY', 'BOOKER', 'BORIS', 'BOYCE', 'BOYD', 'BRAD', 'BRADFORD', 'BRADLEY', 'BRADLY', 'BRADY', 'BRAIN', 'BRANDEN', 'BRANDON', 'BRANT', 'BRENDAN', 'BRENDON', 'BRENT', 'BRENTON', 'BRET', 'BRETT', 'BRIAN', 'BRICE', 'BRITT', 'BROCK', 'BRODERICK', 'BROOKS', 'BRUCE', 'BRUNO', 'BRYAN', 'BRYANT', 'BRYCE', 'BRYON', 'BUCK', 'BUD', 'BUDDY', 'BUFORD', 'BURL', 'BURT', 'BURTON', 'BUSTER', 'BYRON', 'CALEB', 'CALVIN', 'CAMERON', 'CAREY', 'CARL', 'CARLO', 'CARLOS', 'CARLTON', 'CARMELO', 'CARMEN', 'CARMINE', 'CAROL', 'CARROL', 'CARROLL', 'CARSON', 'CARTER', 'CARY', 'CASEY', 'CECIL', 'CEDRIC', 'CEDRICK', 'CESAR', 'CHAD', 'CHADWICK', 'CHANCE', 'CHANG', 'CHARLES', 'CHARLEY', 'CHARLIE', 'CHAS', 'CHASE', 'CHAUNCEY', 'CHESTER', 'CHET', 'CHI', 'CHONG', 'CHRIS', 'CHRISTIAN', 'CHRISTOPER', 'CHRISTOPHER', 'CHUCK', 'CHUNG', 'CLAIR', 'CLARENCE', 'CLARK', 'CLAUD', 'CLAUDE', 'CLAUDIO', 'CLAY', 'CLAYTON', 'CLEMENT', 'CLEMENTE', 'CLEO', 'CLETUS', 'CLEVELAND', 'CLIFF', 'CLIFFORD', 'CLIFTON', 'CLINT', 'CLINTON', 'CLYDE', 'CODY', 'COLBY', 'COLE', 'COLEMAN', 'COLIN', 'COLLIN', 'COLTON', 'COLUMBUS', 'CONNIE', 'CONRAD', 'CORDELL', 'COREY', 'CORNELIUS', 'CORNELL', 'CORTEZ', 'CORY', 'COURTNEY', 'COY', 'CRAIG', 'CRISTOBAL', 'CRISTOPHER', 'CRUZ', 'CURT', 'CURTIS', 'CYRIL', 'CYRUS', 'DALE', 'DALLAS', 'DALTON', 'DAMIAN', 'DAMIEN', 'DAMION', 'DAMON', 'DAN', 'DANA', 'DANE', 'DANIAL', 'DANIEL', 'DANILO', 'DANNIE', 'DANNY', 'DANTE', 'DARELL', 'DAREN', 'DARIN', 'DARIO', 'DARIUS', 'DARNELL', 'DARON', 'DARREL', 'DARRELL', 'DARREN', 'DARRICK', 'DARRIN', 'DARRON', 'DARRYL', 'DARWIN', 'DARYL', 'DAVE', 'DAVID', 'DAVIS', 'DEAN', 'DEANDRE', 'DEANGELO', 'DEE', 'DEL', 'DELBERT', 'DELMAR', 'DELMER', 'DEMARCUS', 'DEMETRIUS', 'DENIS', 'DENNIS', 'DENNY', 'DENVER', 'DEON', 'DEREK', 'DERICK', 'DERRICK', 'DESHAWN', 'DESMOND', 'DEVIN', 'DEVON', 'DEWAYNE', 'DEWEY', 'DEWITT', 'DEXTER', 'DICK', 'DIEGO', 'DILLON', 'DINO', 'DION', 'DIRK', 'DOMENIC', 'DOMINGO', 'DOMINIC', 'DOMINICK', 'DOMINIQUE', 'DON', 'DONALD', 'DONG', 'DONN', 'DONNELL', 'DONNIE', 'DONNY', 'DONOVAN', 'DONTE', 'DORIAN', 'DORSEY', 'DOUG', 'DOUGLAS', 'DOUGLASS', 'DOYLE', 'DREW', 'DUANE', 'DUDLEY', 'DUNCAN', 'DUSTIN', 'DUSTY', 'DWAIN', 'DWAYNE', 'DWIGHT', 'DYLAN', 'EARL', 'EARLE', 'EARNEST', 'ED', 'EDDIE', 'EDDY', 'EDGAR', 'EDGARDO', 'EDISON', 'EDMOND', 'EDMUND', 'EDMUNDO', 'EDUARDO', 'EDWARD', 'EDWARDO', 'EDWIN', 'EFRAIN', 'EFREN', 'ELBERT', 'ELDEN', 'ELDON', 'ELDRIDGE', 'ELI', 'ELIAS', 'ELIJAH', 'ELISEO', 'ELISHA', 'ELLIOT', 'ELLIOTT', 'ELLIS', 'ELLSWORTH', 'ELMER', 'ELMO', 'ELOY', 'ELROY', 'ELTON', 'ELVIN', 'ELVIS', 'ELWOOD', 'EMANUEL', 'EMERSON', 'EMERY', 'EMIL', 'EMILE', 'EMILIO', 'EMMANUEL', 'EMMETT', 'EMMITT', 'EMORY', 'ENOCH', 'ENRIQUE', 'ERASMO', 'ERIC', 'ERICH', 'ERICK', 'ERIK', 'ERIN', 'ERNEST', 'ERNESTO', 'ERNIE', 'ERROL', 'ERVIN', 'ERWIN', 'ESTEBAN', 'ETHAN', 'EUGENE', 'EUGENIO', 'EUSEBIO', 'EVAN', 'EVERETT', 'EVERETTE', 'EZEKIEL', 'EZEQUIEL', 'EZRA', 'FABIAN', 'FAUSTINO', 'FAUSTO', 'FEDERICO', 'FELIPE', 'FELIX', 'FELTON', 'FERDINAND', 'FERMIN', 'FERNANDO', 'FIDEL', 'FILIBERTO', 'FLETCHER', 'FLORENCIO', 'FLORENTINO', 'FLOYD', 'FOREST', 'FORREST', 'FOSTER', 'FRANCES', 'FRANCESCO', 'FRANCIS', 'FRANCISCO', 'FRANK', 'FRANKIE', 'FRANKLIN', 'FRANKLYN', 'FRED', 'FREDDIE', 'FREDDY', 'FREDERIC', 'FREDERICK', 'FREDRIC', 'FREDRICK', 'FREEMAN', 'FRITZ', 'GABRIEL', 'GAIL', 'GALE', 'GALEN', 'GARFIELD', 'GARLAND', 'GARRET', 'GARRETT', 'GARRY', 'GARTH', 'GARY', 'GASTON', 'GAVIN', 'GAYLE', 'GAYLORD', 'GENARO', 'GENE', 'GEOFFREY', 'GEORGE', 'GERALD', 'GERALDO', 'GERARD', 'GERARDO', 'GERMAN', 'GERRY', 'GIL', 'GILBERT', 'GILBERTO', 'GINO', 'GIOVANNI', 'GIUSEPPE', 'GLEN', 'GLENN', 'GONZALO', 'GORDON', 'GRADY', 'GRAHAM', 'GRAIG', 'GRANT', 'GRANVILLE', 'GREG', 'GREGG', 'GREGORIO', 'GREGORY', 'GROVER', 'GUADALUPE', 'GUILLERMO', 'GUS', 'GUSTAVO', 'GUY', 'HAI', 'HAL', 'HANK', 'HANS', 'HARLAN', 'HARLAND', 'HARLEY', 'HAROLD', 'HARRIS', 'HARRISON', 'HARRY', 'HARVEY', 'HASSAN', 'HAYDEN', 'HAYWOOD', 'HEATH', 'HECTOR', 'HENRY', 'HERB', 'HERBERT', 'HERIBERTO', 'HERMAN', 'HERSCHEL', 'HERSHEL', 'HILARIO', 'HILTON', 'HIPOLITO', 'HIRAM', 'HOBERT', 'HOLLIS', 'HOMER', 'HONG', 'HORACE', 'HORACIO', 'HOSEA', 'HOUSTON', 'HOWARD', 'HOYT', 'HUBERT', 'HUEY', 'HUGH', 'HUGO', 'HUMBERTO', 'HUNG', 'HUNTER', 'HYMAN', 'IAN', 'IGNACIO', 'IKE', 'IRA', 'IRVIN', 'IRVING', 'IRWIN', 'ISAAC', 'ISAIAH', 'ISAIAS', 'ISIAH', 'ISIDRO', 'ISMAEL', 'ISRAEL', 'ISREAL', 'ISSAC', 'IVAN', 'IVORY', 'JACINTO', 'JACK', 'JACKIE', 'JACKSON', 'JACOB', 'JACQUES', 'JAE', 'JAIME', 'JAKE', 'JAMAAL', 'JAMAL', 'JAMAR', 'JAME', 'JAMEL', 'JAMES', 'JAMEY', 'JAMIE', 'JAMISON', 'JAN', 'JARED', 'JAROD', 'JARRED', 'JARRETT', 'JARROD', 'JARVIS', 'JASON', 'JASPER', 'JAVIER', 'JAY', 'JAYSON', 'JC', 'JEAN', 'JED', 'JEFF', 'JEFFEREY', 'JEFFERSON', 'JEFFERY', 'JEFFREY', 'JEFFRY', 'JERALD', 'JERAMY', 'JERE', 'JEREMIAH', 'JEREMY', 'JERMAINE', 'JEROLD', 'JEROME', 'JEROMY', 'JERRELL', 'JERROD', 'JERROLD', 'JERRY', 'JESS', 'JESSE', 'JESSIE', 'JESUS', 'JEWEL', 'JEWELL', 'JIM', 'JIMMIE', 'JIMMY', 'JOAN', 'JOAQUIN', 'JODY', 'JOE', 'JOEL', 'JOESPH', 'JOEY', 'JOHN', 'JOHNATHAN', 'JOHNATHON', 'JOHNIE', 'JOHNNIE', 'JOHNNY', 'JOHNSON', 'JON', 'JONAH', 'JONAS', 'JONATHAN', 'JONATHON', 'JORDAN', 'JORDON', 'JORGE', 'JOSE', 'JOSEF', 'JOSEPH', 'JOSH', 'JOSHUA', 'JOSIAH', 'JOSPEH', 'JOSUE', 'JUAN', 'JUDE', 'JUDSON', 'JULES', 'JULIAN', 'JULIO', 'JULIUS', 'JUNIOR', 'JUSTIN', 'KAREEM', 'KARL', 'KASEY', 'KEENAN', 'KEITH', 'KELLEY', 'KELLY', 'KELVIN', 'KEN', 'KENDALL', 'KENDRICK', 'KENETH', 'KENNETH', 'KENNITH', 'KENNY', 'KENT', 'KENTON', 'KERMIT', 'KERRY', 'KEVEN', 'KEVIN', 'KIETH', 'KIM', 'KING', 'KIP', 'KIRBY', 'KIRK', 'KOREY', 'KORY', 'KRAIG', 'KRIS', 'KRISTOFER', 'KRISTOPHER', 'KURT', 'KURTIS', 'KYLE', 'LACY', 'LAMAR', 'LAMONT', 'LANCE', 'LANDON', 'LANE', 'LANNY', 'LARRY', 'LAUREN', 'LAURENCE', 'LAVERN', 'LAVERNE', 'LAWERENCE', 'LAWRENCE', 'LAZARO', 'LEANDRO', 'LEE', 'LEIF', 'LEIGH', 'LELAND', 'LEMUEL', 'LEN', 'LENARD', 'LENNY', 'LEO', 'LEON', 'LEONARD', 'LEONARDO', 'LEONEL', 'LEOPOLDO', 'LEROY', 'LES', 'LESLEY', 'LESLIE', 'LESTER', 'LEVI', 'LEWIS', 'LINCOLN', 'LINDSAY', 'LINDSEY', 'LINO', 'LINWOOD', 'LIONEL', 'LLOYD', 'LOGAN', 'LON', 'LONG', 'LONNIE', 'LONNY', 'LOREN', 'LORENZO', 'LOU', 'LOUIE', 'LOUIS', 'LOWELL', 'LOYD', 'LUCAS', 'LUCIANO', 'LUCIEN', 'LUCIO', 'LUCIUS', 'LUIGI', 'LUIS', 'LUKE', 'LUPE', 'LUTHER', 'LYLE', 'LYMAN', 'LYNDON', 'LYNN', 'LYNWOOD', 'MAC', 'MACK', 'MAJOR', 'MALCOLM', 'MALCOM', 'MALIK', 'MAN', 'MANUAL', 'MANUEL', 'MARC', 'MARCEL', 'MARCELINO', 'MARCELLUS', 'MARCELO', 'MARCO', 'MARCOS', 'MARCUS', 'MARGARITO', 'MARIA', 'MARIANO', 'MARIO', 'MARION', 'MARK', 'MARKUS', 'MARLIN', 'MARLON', 'MARQUIS', 'MARSHALL', 'MARTIN', 'MARTY', 'MARVIN', 'MARY', 'MASON', 'MATHEW', 'MATT', 'MATTHEW', 'MAURICE', 'MAURICIO', 'MAURO', 'MAX', 'MAXIMO', 'MAXWELL', 'MAYNARD', 'MCKINLEY', 'MEL', 'MELVIN', 'MERLE', 'MERLIN', 'MERRILL', 'MERVIN', 'MICAH', 'MICHAEL', 'MICHAL', 'MICHALE', 'MICHEAL', 'MICHEL', 'MICKEY', 'MIGUEL', 'MIKE', 'MIKEL', 'MILAN', 'MILES', 'MILFORD', 'MILLARD', 'MILO', 'MILTON', 'MINH', 'MIQUEL', 'MITCH', 'MITCHEL', 'MITCHELL', 'MODESTO', 'MOHAMED', 'MOHAMMAD', 'MOHAMMED', 'MOISES', 'MONROE', 'MONTE', 'MONTY', 'MORGAN', 'MORRIS', 'MORTON', 'MOSE', 'MOSES', 'MOSHE', 'MURRAY', 'MYLES', 'MYRON', 'NAPOLEON', 'NATHAN', 'NATHANAEL', 'NATHANIAL', 'NATHANIEL', 'NEAL', 'NED', 'NEIL', 'NELSON', 'NESTOR', 'NEVILLE', 'NEWTON', 'NICHOLAS', 'NICK', 'NICKOLAS', 'NICKY', 'NICOLAS', 'NIGEL', 'NOAH', 'NOBLE', 'NOE', 'NOEL', 'NOLAN', 'NORBERT', 'NORBERTO', 'NORMAN', 'NORMAND', 'NORRIS', 'NUMBERS', 'OCTAVIO', 'ODELL', 'ODIS', 'OLEN', 'OLIN', 'OLIVER', 'OLLIE', 'OMAR', 'OMER', 'OREN', 'ORLANDO', 'ORVAL', 'ORVILLE', 'OSCAR', 'OSVALDO', 'OSWALDO', 'OTHA', 'OTIS', 'OTTO', 'OWEN', 'PABLO', 'PALMER', 'PARIS', 'PARKER', 'PASQUALE', 'PAT', 'PATRICIA', 'PATRICK', 'PAUL', 'PEDRO', 'PERCY', 'PERRY', 'PETE', 'PETER', 'PHIL', 'PHILIP', 'PHILLIP', 'PIERRE', 'PORFIRIO', 'PORTER', 'PRESTON', 'PRINCE', 'QUENTIN', 'QUINCY', 'QUINN', 'QUINTIN', 'QUINTON', 'RAFAEL', 'RALEIGH', 'RALPH', 'RAMIRO', 'RAMON', 'RANDAL', 'RANDALL', 'RANDELL', 'RANDOLPH', 'RANDY', 'RAPHAEL', 'RASHAD', 'RAUL', 'RAY', 'RAYFORD', 'RAYMON', 'RAYMOND', 'RAYMUNDO', 'REED', 'REFUGIO', 'REGGIE', 'REGINALD', 'REID', 'REINALDO', 'RENALDO', 'RENATO', 'RENE', 'REUBEN', 'REX', 'REY', 'REYES', 'REYNALDO', 'RHETT', 'RICARDO', 'RICH', 'RICHARD', 'RICHIE', 'RICK', 'RICKEY', 'RICKIE', 'RICKY', 'RICO', 'RIGOBERTO', 'RILEY', 'ROB', 'ROBBIE', 'ROBBY', 'ROBERT', 'ROBERTO', 'ROBIN', 'ROBT', 'ROCCO', 'ROCKY', 'ROD', 'RODERICK', 'RODGER', 'RODNEY', 'RODOLFO', 'RODRICK', 'RODRIGO', 'ROGELIO', 'ROGER', 'ROLAND', 'ROLANDO', 'ROLF', 'ROLLAND', 'ROMAN', 'ROMEO', 'RON', 'RONALD', 'RONNIE', 'RONNY', 'ROOSEVELT', 'RORY', 'ROSARIO', 'ROSCOE', 'ROSENDO', 'ROSS', 'ROY', 'ROYAL', 'ROYCE', 'RUBEN', 'RUBIN', 'RUDOLF', 'RUDOLPH', 'RUDY', 'RUEBEN', 'RUFUS', 'RUPERT', 'RUSS', 'RUSSEL', 'RUSSELL', 'RUSTY', 'RYAN', 'SAL', 'SALVADOR', 'SALVATORE', 'SAM', 'SAMMIE', 'SAMMY', 'SAMUAL', 'SAMUEL', 'SANDY', 'SANFORD', 'SANG', 'SANTIAGO', 'SANTO', 'SANTOS', 'SAUL', 'SCOT', 'SCOTT', 'SCOTTIE', 'SCOTTY', 'SEAN', 'SEBASTIAN', 'SERGIO', 'SETH', 'SEYMOUR', 'SHAD', 'SHANE', 'SHANNON', 'SHAUN', 'SHAWN', 'SHAYNE', 'SHELBY', 'SHELDON', 'SHELTON', 'SHERMAN', 'SHERWOOD', 'SHIRLEY', 'SHON', 'SID', 'SIDNEY', 'SILAS', 'SIMON', 'SOL', 'SOLOMON', 'SON', 'SONNY', 'SPENCER', 'STACEY', 'STACY', 'STAN', 'STANFORD', 'STANLEY', 'STANTON', 'STEFAN', 'STEPHAN', 'STEPHEN', 'STERLING', 'STEVE', 'STEVEN', 'STEVIE', 'STEWART', 'STUART', 'SUNG', 'SYDNEY', 'SYLVESTER', 'TAD', 'TANNER', 'TAYLOR', 'TED', 'TEDDY', 'TEODORO', 'TERENCE', 'TERRANCE', 'TERRELL', 'TERRENCE', 'TERRY', 'THAD', 'THADDEUS', 'THANH', 'THEO', 'THEODORE', 'THERON', 'THOMAS', 'THURMAN', 'TIM', 'TIMMY', 'TIMOTHY', 'TITUS', 'TOBIAS', 'TOBY', 'TOD', 'TODD', 'TOM', 'TOMAS', 'TOMMIE', 'TOMMY', 'TONEY', 'TONY', 'TORY', 'TRACEY', 'TRACY', 'TRAVIS', 'TRENT', 'TRENTON', 'TREVOR', 'TREY', 'TRINIDAD', 'TRISTAN', 'TROY', 'TRUMAN', 'TUAN', 'TY', 'TYLER', 'TYREE', 'TYRELL', 'TYRON', 'TYRONE', 'TYSON', 'ULYSSES', 'VAL', 'VALENTIN', 'VALENTINE', 'VAN', 'VANCE', 'VAUGHN', 'VERN', 'VERNON', 'VICENTE', 'VICTOR', 'VINCE', 'VINCENT', 'VINCENZO', 'VIRGIL', 'VIRGILIO', 'VITO', 'VON', 'WADE', 'WALDO', 'WALKER', 'WALLACE', 'WALLY', 'WALTER', 'WALTON', 'WARD', 'WARNER', 'WARREN', 'WAYLON', 'WAYNE', 'WELDON', 'WENDELL', 'WERNER', 'WES', 'WESLEY', 'WESTON', 'WHITNEY', 'WILBER', 'WILBERT', 'WILBUR', 'WILBURN', 'WILEY', 'WILFORD', 'WILFRED', 'WILFREDO', 'WILL', 'WILLARD', 'WILLIAM', 'WILLIAMS', 'WILLIAN', 'WILLIE', 'WILLIS', 'WILLY', 'WILMER', 'WILSON', 'WILTON', 'WINFORD', 'WINFRED', 'WINSTON', 'WM', 'WOODROW', 'WYATT', 'XAVIER', 'YONG', 'YOUNG', 'ZACHARIAH', 'ZACHARY', 'ZACHERY', 'ZACK', 'ZACKARY', 'ZANE'];
const SURNAMES = ['SMITH', 'JOHNSON', 'MILLER', 'BROWN', 'JONES', 'WILLIAMS', 'DAVIS', 'ANDERSON', 'WILSON', 'MARTIN', 'TAYLOR', 'MOORE', 'THOMPSON', 'WHITE', 'CLARK', 'THOMAS', 'HALL', 'BAKER', 'NELSON', 'ALLEN', 'YOUNG', 'HARRIS', 'KING', 'ADAMS', 'LEWIS', 'WALKER', 'WRIGHT', 'ROBERTS', 'CAMPBELL', 'JACKSON', 'PHILLIPS', 'HILL', 'SCOTT', 'ROBINSON', 'MURPHY', 'COOK', 'GREEN', 'LEE', 'EVANS', 'PETERSON', 'MORRIS', 'COLLINS', 'MITCHELL', 'PARKER', 'ROGERS', 'STEWART', 'TURNER', 'WOOD', 'CARTER', 'MORGAN', 'COX', 'KELLY', 'EDWARDS', 'BAILEY', 'WARD', 'REED', 'MYERS', 'SULLIVAN', 'COOPER', 'BENNETT', 'HUGHES', 'LONG', 'FISHER', 'PRICE', 'RUSSELL', 'HOWARD', 'GRAY', 'BELL', 'WATSON', 'REYNOLDS', 'FOSTER', 'ROSS', 'OLSON', 'RICHARDSON', 'SNYDER', 'POWELL', 'STEVENS', 'BROOKS', 'PERRY', 'WEST', 'COLE', 'WAGNER', 'MEYER', 'KENNEDY', 'BARNES', 'HAMILTON', 'GRAHAM', 'SCHMIDT', 'SANDERS', 'MCDONALD', 'PATTERSON', 'MURRAY', 'GIBSON', 'WALLACE', 'BUTLER', 'HAYES', 'BURNS', 'ELLIS', 'FOX', 'STONE', 'HENDERSON', 'WELLS', 'RYAN', 'JENKINS', 'HANSEN', 'WEBB', 'JAMES', 'JORDAN', 'GRIFFIN', 'HOFFMAN', 'HARRISON', 'ROSE', 'SIMMONS', 'MARSHALL', 'JOHNSTON', 'OWENS', 'NICHOLS', 'WEAVER', 'KELLEY', 'MILLS', 'ALEXANDER', 'TUCKER', 'PALMER', 'RICE', 'LARSON', 'SIMPSON', 'SHAW', 'CARLSON', 'HUNT', 'BLACK', 'FORD', 'PETERS', 'ARNOLD', 'ROBERTSON', 'PIERCE', 'DUNN', 'CRAWFORD', 'BRYANT', 'CARPENTER', 'PORTER', 'CARROLL', 'ELLIOTT', 'FREEMAN', 'MASON', 'FERGUSON', 'OBRIEN', 'HART', 'COLEMAN', 'WARREN', 'JENSEN', 'GARDNER', 'HICKS', 'STEPHENS', 'HENRY', 'GORDON', 'BURKE', 'WEBER', 'DUNCAN', 'RICHARDS', 'WOODS', 'HANSON', 'LANE', 'PAYNE', 'CHAPMAN', 'SCHULTZ', 'WHEELER', 'RAY', 'CUNNINGHAM', 'WALSH', 'KNIGHT', 'BISHOP', 'BOYD', 'ARMSTRONG', 'SCHNEIDER', 'HUNTER', 'SPENCER', 'LYNCH', 'MORRISON', 'RILEY', 'ANDREWS', 'BERRY', 'BRADLEY', 'PERKINS', 'HUDSON', 'WELCH', 'GILBERT', 'LAWRENCE', 'HOWELL', 'WALTERS', 'HOLMES', 'WILLIAMSON', 'JACOBS', 'DAVIDSON', 'LAWSON', 'KELLER', 'MAY', 'DIXON', 'DAY', 'CARR', 'DEAN', 'GEORGE', 'FOWLER', 'BECK', 'NEWMAN', 'HAWKINS', 'BECKER', 'BOWMAN', 'GREENE', 'HARPER', 'BREWER', 'MATTHEWS', 'POWERS', 'SCHWARTZ', 'WILLIS', 'FULLER', 'BARRETT', 'DANIELS', 'HARVEY', 'COHEN', 'CURTIS', 'WATKINS', 'HOLLAND', 'MONTGOMERY', 'AUSTIN', 'GRANT', 'GARRETT', 'ERICKSON', 'LAMBERT', 'KLEIN', 'ZIMMERMAN', 'WOLFE', 'MCCARTHY', 'STANLEY', 'BARKER', 'BURTON', 'OLIVER', 'LITTLE', 'LUCAS', 'LEONARD', 'PEARSON', 'MCCOY', 'CRAIG', 'BARNETT', 'BATES', 'GREGORY', 'HOPKINS', 'OCONNOR', 'WARNER', 'SWANSON', 'NORRIS', 'HALE', 'ROBBINS', 'HOLT', 'RHODES', 'CHRISTENSEN', 'STEELE', 'MCDANIEL', 'BENSON', 'MANN', 'SHELTON', 'LOWE', 'HIGGINS', 'FISCHER', 'DOYLE', 'GRIFFITH', 'REID', 'FRANKLIN', 'QUINN', 'FLEMING', 'SUTTON', 'BALL', 'MCLAUGHLIN', 'WOLF', 'SHARP', 'GALLAGHER', 'BOWEN', 'FITZGERALD', 'GROSS', 'SCHROEDER', 'POTTER', 'CALDWELL', 'JENNINGS', 'REEVES', 'ADKINS', 'BRADY', 'LYONS', 'MULLINS', 'WADE', 'BALDWIN', 'VAUGHN', 'MUELLER', 'CHAMBERS', 'PAGE', 'PARKS', 'BLAIR', 'FIELDS', 'PARSONS', 'FLETCHER', 'WATTS', 'SIMS', 'RAMSEY', 'HARTMAN', 'KRAMER', 'BUSH', 'HORTON', 'BAUER', 'BARBER', 'SHERMAN', 'DOUGLAS', 'GRAVES', 'CHANDLER', 'CROSS', 'BARTON', 'HARMON', 'CUMMINGS', 'FLYNN', 'TODD', 'MCKINNEY', 'GOODMAN', 'TERRY', 'CASEY', 'FRANK', 'DAWSON', 'OWEN', 'NEWTON', 'THORNTON', 'MORAN', 'SHAFFER', 'MCCORMICK', 'BURGESS', 'MCGUIRE', 'GOODWIN', 'HESS', 'NORTON', 'FRENCH', 'OSBORNE', 'MANNING', 'BOWERS', 'ROTH', 'HARRINGTON', 'OLSEN', 'ROWE', 'BYRD', 'NEAL', 'HAMMOND', 'WEISS', 'FARMER', 'WISE', 'SPARKS', 'GARNER', 'WEBSTER', 'PAUL', 'RODGERS', 'MOSS', 'GARCIA', 'PETERSEN', 'SIMON', 'HOOVER', 'HODGES', 'HAYNES', 'FRAZIER', 'MILES', 'DECKER', 'MARSH', 'MEYERS', 'STRICKLAND', 'BLAKE', 'DENNIS', 'LAMB', 'BUCHANAN', 'HOGAN', 'BROCK', 'YATES', 'COCHRAN', 'LARSEN', 'CONNER', 'LANG', 'DANIEL', 'HUBBARD', 'MAXWELL', 'WATERS', 'CANNON', 'PATTON', 'REESE', 'HARDY', 'GILL', 'MALONE', 'DRAKE', 'PRATT', 'STEVENSON', 'SHORT', 'WALL', 'FOLEY', 'SWEENEY', 'TOWNSEND', 'WILCOX', 'WILKINSON', 'HENSLEY', 'ABBOTT', 'FARRELL', 'SHEPHERD', 'SAUNDERS', 'MARTINEZ', 'NORMAN', 'MCGEE', 'BRYAN', 'MCBRIDE', 'BERG', 'COMBS', 'LOVE', 'BRENNAN', 'CAIN', 'CLINE', 'HUFFMAN', 'BALLARD', 'COBB', 'KIRBY', 'ONEILL', 'FRANCIS', 'KOCH', 'LLOYD', 'RUSSO', 'CAREY', 'CALLAHAN', 'MOODY', 'MORROW', 'UNDERWOOD', 'YORK', 'POPE', 'BOYER', 'HUFF', 'MORTON', 'SUMMERS', 'BRIGGS', 'HORN', 'KANE', 'WALTON', 'PHELPS', 'RODRIGUEZ', 'DALTON', 'PATRICK', 'CONLEY', 'KIRK', 'CURRY', 'HANCOCK', 'FLOYD', 'MACDONALD', 'YODER', 'LOGAN', 'LINDSEY', 'NICHOLSON', 'JACOBSON', 'GARRISON', 'WALTER', 'KLINE', 'ALLISON', 'SKINNER', 'SILVA', 'CHASE', 'INGRAM', 'GIBBS', 'BURNETT', 'ATKINSON', 'DILLON', 'VINCENT', 'HEATH', 'BRUCE', 'CARSON', 'STEIN', 'CLARKE', 'BOOTH', 'GREER', 'RICH', 'ODONNELL', 'HINES', 'HOOD', 'BANKS', 'POOLE', 'BERGER', 'CAMERON', 'BLANKENSHIP', 'MCCLURE', 'MASSEY', 'EATON', 'BARRY', 'RANDALL', 'DAVENPORT', 'TYLER', 'PARRISH', 'MELTON', 'DYER', 'WHITAKER', 'STOUT', 'BOND', 'ROY', 'SNOW', 'WYATT', 'SAWYER', 'KNAPP', 'BAXTER', 'HENSON', 'NOLAN', 'BARTLETT', 'SCHAEFER', 'MARKS', 'STARK', 'NIELSEN', 'CLAYTON', 'GATES', 'SEXTON', 'TATE', 'TANNER', 'BASS', 'MCKEE', 'MATHEWS', 'HERMAN', 'SHIELDS', 'STEPHENSON', 'REILLY', 'HURST', 'JOHNS', 'VANCE', 'RICHARD', 'HOBBS', 'BUCK', 'KERR', 'GRIMES', 'BROWNING', 'KEITH', 'COLLIER', 'MCKENZIE', 'MORSE', 'CONRAD', 'HUTCHINSON', 'HOWE', 'SAVAGE', 'HAMPTON', 'BOYLE', 'DONOVAN', 'HEBERT', 'MAYER', 'COPELAND', 'NASH', 'BRIDGES', 'STAFFORD', 'GOLDEN', 'KENT', 'MCMAHON', 'ROACH', 'WILKINS', 'MAHONEY', 'PECK', 'HULL', 'LOPEZ', 'DOUGHERTY', 'BEARD', 'CONWAY', 'CASE', 'LEACH', 'BARR', 'LEBLANC', 'PENNINGTON', 'HODGE', 'HURLEY', 'ORR', 'FROST', 'STOKES', 'CHRISTIAN', 'GENTRY', 'KRUEGER', 'MEADOWS', 'FRIEDMAN', 'MCCONNELL', 'HUBER', 'WINTERS', 'WEEKS', 'GLOVER', 'HAHN', 'HUMPHREY', 'DUFFY', 'ATKINS', 'PITTMAN', 'MONROE', 'BRADFORD', 'FRY', 'SHANNON', 'BENDER', 'BUCKLEY', 'SLOAN', 'GILLESPIE', 'MOYER', 'PRESTON', 'MERRITT', 'FITZPATRICK', 'MCINTYRE', 'OCONNELL', 'MCDOWELL', 'SCHMITT', 'NOVAK', 'LESTER', 'RASMUSSEN', 'BRANDT', 'MICHAEL', 'CRANE', 'BLACKBURN', 'HOLLOWAY', 'BLEVINS', 'MATHIS', 'MCCULLOUGH', 'GOULD', 'ENGLISH', 'HARRELL', 'KAUFMAN', 'BOONE', 'DICKERSON', 'KRAUSE', 'HARDIN', 'WERNER', 'FREDERICK', 'ANTHONY', 'WOODWARD', 'AYERS', 'KEMP', 'HAAS', 'BRADSHAW', 'SELLERS', 'HENDRICKS', 'MULLEN', 'MCGRATH', 'MCFARLAND', 'BENTLEY', 'NOBLE', 'GLASS', 'CHURCH', 'IRWIN', 'MCCARTY', 'LANDRY', 'CLEMENTS', 'HERNANDEZ', 'LYNN', 'GILMORE', 'WILEY', 'BLANCHARD', 'ANDERSEN', 'DURHAM', 'PITTS', 'PRUITT', 'LEVINE', 'COFFEY', 'BEASLEY', 'BAIRD', 'MACK', 'FARLEY', 'DAUGHERTY', 'ESTES', 'MAYNARD', 'MCCANN', 'CANTRELL', 'VAUGHAN', 'RAYMOND', 'WHITEHEAD', 'HARDING', 'FREY', 'BLACKWELL', 'GOOD', 'BRAUN', 'HATFIELD', 'GLENN', 'HOUSE', 'FRITZ', 'PRINCE', 'PACE', 'WILKERSON', 'HICKMAN', 'HANNA', 'DODSON', 'FRYE', 'COMPTON', 'RITTER', 'ONEAL', 'BEAN', 'KAISER', 'POTTS', 'HAYS', 'LUTZ', 'SHEA', 'ROWLAND', 'LIVINGSTON', 'BIRD', 'STUART', 'MOONEY', 'FLOWERS', 'SHEPARD', 'MCKAY', 'HALEY', 'RIGGS', 'JOYCE', 'LEHMAN', 'STRONG', 'MADDEN', 'DUNLAP', 'WHITNEY', 'HAYDEN', 'OSBORN', 'SMALL', 'JARVIS', 'MOON', 'DONNELLY', 'HOUSTON', 'KATZ', 'DUKE', 'MCINTOSH', 'SNIDER', 'DAVIES', 'COSTA', 'RIDDLE', 'LOWERY', 'DONAHUE', 'VOGEL', 'LEVY', 'STANTON', 'MCCLAIN', 'KUHN', 'GOLDSTEIN', 'WITT', 'SHOEMAKER', 'MERRILL', 'PEREZ', 'WINTER', 'HANEY', 'GOLDBERG', 'ODELL', 'FAULKNER', 'MCLEAN', 'RUSH', 'BRAY', 'COSTELLO', 'DOWNS', 'ROBERSON', 'BURCH', 'GORMAN', 'CARVER', 'LANGE', 'GONZALEZ', 'WORKMAN', 'JOSEPH', 'MALONEY', 'ELLISON', 'GUTHRIE', 'KAPLAN', 'MERCER', 'GOFF', 'DALY', 'CRAMER', 'MCCALL', 'MOSER', 'KNOX', 'MIDDLETON', 'CROSBY', 'CARNEY', 'RICHTER', 'WOODARD', 'SPEARS', 'HOOPER', 'HERRING', 'SANFORD', 'CROWLEY', 'KESSLER', 'WALLS', 'BYRNE', 'CONNOLLY', 'MCDERMOTT', 'EVERETT', 'WIGGINS', 'BULLOCK', 'HENDRICKSON', 'CHILDERS', 'HELMS', 'MCMILLAN', 'FINK', 'FINLEY', 'ASHLEY', 'MCCABE', 'PEARCE', 'HARTLEY', 'ARCHER', 'HENDRIX', 'BEACH', 'AVERY', 'LANCASTER', 'BEST', 'JUSTICE', 'HICKEY', 'WELSH', 'DICKSON', 'TRACY', 'KINNEY', 'PUGH', 'HOLDEN', 'MARINO', 'SOLOMON', 'MCPHERSON', 'FLANAGAN', 'CALHOUN', 'HORNE', 'DELANEY', 'SPRINGER', 'SEARS', 'HAINES', 'BENTON', 'RICHMOND', 'RITCHIE', 'DONALDSON', 'GILES', 'COWAN', 'HESTER', 'DOLAN', 'KERN', 'CROWE', 'ENGLAND', 'SPENCE', 'TUTTLE', 'VALENTINE', 'PETTY', 'DOHERTY', 'BYERS', 'EWING', 'EMERSON', 'COOLEY', 'HOLCOMB', 'KENDALL', 'LAKE', 'DODD', 'SLATER', 'SORENSEN', 'COOKE', 'CLAY', 'GUSTAFSON', 'LYON', 'NEWELL', 'SANCHEZ', 'CAMP', 'CRAFT', 'BARLOW', 'SWEET', 'TRAVIS', 'MADDOX', 'DAVID', 'SHEEHAN', 'HYDE', 'PUCKETT', 'BOGGS', 'WALLER', 'ONEIL', 'DWYER', 'PROCTOR', 'ALBERT', 'SINGLETON', 'MCNAMARA', 'SHEPPARD', 'MCKENNA', 'CHAMBERLAIN', 'GIBBONS', 'BARRON', 'FRANKS', 'HASTINGS', 'HOLDER', 'FERRELL', 'CRABTREE', 'MCGOWAN', 'BERNARD', 'PARK', 'DAILEY', 'HEWITT', 'SUTHERLAND', 'KIDD', 'PIKE', 'CASSIDY', 'SWARTZ', 'SHAFER', 'GALLOWAY', 'OTT', 'ROMANO', 'KENNEY', 'BOLTON', 'HELLER', 'FARRIS', 'ROSENBERG', 'FINCH', 'GAY', 'STARR', 'HOPPER', 'BOWLING', 'WARE', 'ODOM', 'MULLER', 'MEIER', 'ROLLINS', 'DICKINSON', 'FORBES', 'DEMPSEY', 'SHAPIRO', 'DUDLEY', 'ROSSI', 'CHANEY', 'PIERSON', 'LINDSAY', 'KIRKPATRICK', 'SCHUMACHER', 'DENTON', 'MCGINNIS', 'PATE', 'CURRAN', 'SARGENT', 'ZIEGLER', 'NIXON', 'ACKERMAN', 'CONNOR', 'RATLIFF', 'SINGER', 'BRIGHT', 'DOWNEY', 'GLEASON', 'DYE', 'SAMPSON', 'COUCH', 'FULTON', 'COFFMAN', 'DALE', 'ELDER', 'FUNK', 'STERN', 'WORLEY', 'COURTNEY', 'RUTHERFORD', 'RANDOLPH', 'SHIRLEY', 'CASH', 'MCALLISTER', 'HAMM', 'SCHAFER', 'FISH', 'DOWNING', 'BELCHER', 'BRUNO', 'KNOWLES', 'BRITT', 'SCHULZ', 'EMERY', 'ALBRIGHT', 'HELTON', 'HOLMAN', 'ROE', 'KEY', 'HILTON', 'HATCH', 'LUND', 'DEWITT', 'BACON', 'RANKIN', 'LANGLEY', 'BLOOM', 'KURTZ', 'PADGETT', 'MAYS', 'FIELD', 'AKERS', 'DOTSON', 'FELDMAN', 'GOLDMAN', 'SCHMITZ', 'WHALEN', 'GODFREY', 'MAYO', 'WEBBER', 'POLLARD', 'HAGEN', 'TIPTON', 'ELKINS', 'CROUCH', 'LOCKE', 'CONKLIN', 'WILLS', 'DRISCOLL', 'POST', 'SIMONS', 'THOMSON', 'SWENSON', 'STEINER', 'ARTHUR', 'STOVER', 'ROSEN', 'CHRISTOPHER', 'HEAD', 'SANTOS', 'HORNER', 'HOLBROOK', 'MEEKS', 'KIMBALL', 'EGAN', 'GREGG', 'NEFF', 'WOODRUFF', 'HUTCHISON', 'MAHER', 'MACKEY', 'MCLEOD', 'ESPOSITO', 'STAHL', 'BRITTON', 'MASTERS', 'PRITCHARD', 'MOSES', 'CONNELLY', 'ROBISON', 'YEAGER', 'CORBETT', 'LOWRY', 'LUDWIG', 'SPRAGUE', 'LAW', 'INMAN', 'CHERRY', 'SIEGEL', 'GOSS', 'MCMANUS', 'TOMLINSON', 'WILDER', 'CROW', 'GROVES', 'LORD', 'OTTO', 'GRIMM', 'BABCOCK', 'OLEARY', 'BEATTY', 'WINKLER', 'PAINTER', 'ENGEL', 'METCALF', 'KOENIG', 'CONNELL', 'MCDONOUGH', 'SEYMOUR', 'JEWELL', 'SELF', 'BURT', 'HAMMER', 'RUBIN', 'PICKETT', 'CLEVELAND', 'SANDERSON', 'STRATTON', 'HINKLE', 'KRAFT', 'BOWER', 'DEVINE', 'HUTCHINS', 'MORIN', 'MCCLELLAN', 'MEREDITH', 'DODGE', 'KIRKLAND', 'BINGHAM', 'POLLOCK', 'SHARPE', 'WOOTEN', 'ELDRIDGE', 'GARLAND', 'MCCAULEY', 'REGAN', 'CLIFTON', 'WOLFF', 'NICHOLAS', 'MEAD', 'DOOLEY', 'KAY', 'HEALY', 'GROVE', 'MANLEY', 'BLANTON', 'MCKNIGHT', 'TOMPKINS', 'GREENBERG', 'BOYCE', 'FRASER', 'RUTLEDGE', 'BURRIS', 'GREENWOOD', 'GUNTER', 'BLOCK', 'SHERIDAN', 'CLIFFORD', 'CHARLES', 'COTE', 'GEIGER', 'LINK', 'QUICK', 'KAUFFMAN', 'HATCHER', 'SINCLAIR', 'ERWIN', 'HAND', 'ALFORD', 'SHEETS', 'TALLEY', 'CORBIN', 'DUBOIS', 'DAHL', 'GAGNON', 'DICK', 'MAURER', 'DUGAN', 'DICKEY', 'METZGER', 'CLEMENT', 'TORRES', 'GRACE', 'GUY', 'HOLLEY', 'MAYFIELD', 'CHILDRESS', 'MCELROY', 'ELMORE', 'TEAGUE', 'HAGER', 'TERRELL', 'HOYT', 'WHITLEY', 'BENJAMIN', 'WILLARD', 'CARUSO', 'STILES', 'GONZALES', 'SHERWOOD', 'BEAVER', 'LARKIN', 'GAMBLE', 'KRUSE', 'PURCELL', 'CAHILL', 'PHIPPS', 'TOTH', 'FERRIS', 'WALDEN', 'HOLLINGSWORTH', 'VOSS', 'COKER', 'CORNELL', 'BUTCHER', 'JORGENSEN', 'GAINES', 'MCFADDEN', 'MOSLEY', 'NIX', 'PIPER', 'BOWLES', 'ROOT', 'STROUD', 'REECE', 'HERRON', 'SWIFT', 'MESSER', 'OHARA', 'DUNHAM', 'WILHELM', 'METZ', 'MEADE', 'URBAN', 'SCHAFFER', 'DRAPER', 'HERBERT', 'AMES', 'DALEY', 'NOEL', 'POE', 'STINSON', 'THACKER', 'BIGGS', 'HOLLIS', 'FINN', 'PEDERSEN', 'BERGERON', 'RAMEY', 'BARNHART', 'BURGER', 'BOUCHER', 'FOREMAN', 'SIZEMORE', 'COYLE', 'GRADY', 'BILLINGS', 'ABRAMS', 'CULLEN', 'GODWIN', 'MCGILL', 'HINTON', 'PAULSON', 'CUMMINS', 'LESLIE', 'KOEHLER', 'MCNEIL', 'LOVELL', 'WOMACK', 'MINER', 'LEVIN', 'DIAMOND', 'YOST', 'WASHBURN', 'MILLIGAN', 'ALDRIDGE', 'KEENAN', 'SMART', 'ENGLE', 'WHALEY', 'JACOBSEN', 'PEACOCK', 'SILVER', 'WESTON', 'CONNORS', 'DORSEY', 'SWAN', 'CRONIN', 'CREWS', 'BARNARD', 'GORE', 'ROUSE', 'CHAPPELL', 'KILGORE', 'NOWAK', 'GIFFORD', 'WHITMAN', 'SPANGLER', 'DIEHL', 'BROUSSARD', 'DIETZ', 'CHRISTIANSEN', 'BONNER', 'EDDY', 'ERNST', 'SHELDON', 'TEMPLE', 'HOUSER', 'GILLIAM', 'MCCRACKEN', 'CHILDS', 'CROCKER', 'MCKINLEY', 'RIVERA', 'CASTLE', 'BRAGG', 'GOODRICH', 'COULTER', 'TIDWELL', 'DAVISON', 'CAUDILL', 'YARBROUGH', 'LOCKHART', 'BOWDEN', 'PLUMMER', 'HAGAN', 'VICKERS', 'BUNCH', 'DREW', 'KOWALSKI', 'LANDIS', 'MCHUGH', 'NORTH', 'KENDRICK', 'TACKETT', 'THOMASON', 'KRAUS', 'MCGRAW', 'SHIPLEY', 'DUVALL', 'MAGEE', 'HOSKINS', 'BOSWELL', 'FLORES', 'DEAL', 'RIZZO', 'BEYER', 'BASSETT', 'WADDELL', 'LAND', 'BERNSTEIN', 'LOCKWOOD', 'PETTIT', 'HEDRICK', 'SADLER', 'LEDFORD', 'HANLEY', 'GRIGGS', 'PUTNAM', 'GROSSMAN', 'RAMIREZ', 'CARTWRIGHT', 'MINOR', 'CAPPS', 'LOTT', 'WISEMAN', 'LILLY', 'NEELY', 'COTTON', 'PRYOR', 'COLVIN', 'ASH', 'OGDEN', 'BRANDON', 'VOGT', 'GALLO', 'CARLTON', 'BERGMAN', 'MCMULLEN', 'LATHAM', 'FLAHERTY', 'RING', 'NANCE', 'LAYTON', 'STACY', 'IVEY', 'DILLARD', 'SWAIN', 'FORREST', 'DUNBAR', 'TRIPP', 'RHOADES', 'GOLD', 'COPE', 'ALBRECHT', 'DOTY', 'ZIMMER', 'DELONG', 'MOBLEY', 'WEIR', 'PELLETIER', 'VINSON', 'BULLARD', 'SKAGGS', 'RAINES', 'BAUMAN', 'LEDBETTER', 'BLUM', 'SCHUSTER', 'WINN', 'ECKERT', 'HYATT', 'HADLEY', 'SHULTZ', 'SNELL', 'MOHR', 'HATHAWAY', 'CORCORAN', 'OMALLEY', 'MANSFIELD', 'HOFF', 'ABEL', 'TOBIN', 'FARR', 'STERLING', 'BERMAN', 'KISER', 'THURMAN', 'LAIRD', 'BUCKNER', 'SHEARER', 'HINSON', 'BATEMAN', 'BRANCH', 'PLATT', 'CROWDER', 'GRECO', 'WELLER', 'CARLISLE', 'CAGLE', 'HIRSCH', 'OKEEFE', 'MCGOVERN', 'FITCH', 'STORY', 'HANKINS', 'BUSCH', 'NAPIER', 'BUTTS', 'GOMEZ', 'BENOIT', 'ROMERO', 'REEDER', 'ALLRED', 'NEUMANN', 'MCWILLIAMS', 'MCCORMACK', 'KNUTSON', 'RICHEY', 'ULRICH', 'SUMNER', 'DARLING', 'ALDRICH', 'PAPPAS', 'BRAND', 'SCHRADER', 'ROCK', 'KEEN', 'CAVANAUGH', 'ROSENTHAL', 'SOUZA', 'QUIGLEY', 'SCHULTE', 'KOHLER', 'BEAL', 'SPAULDING', 'JUDD', 'DARNELL', 'BURKETT', 'CATES', 'FERNANDEZ', 'MAYES', 'DILL', 'WYNN', 'SCHWAB', 'MADSEN', 'BLAND', 'GERBER', 'COON', 'BENEDICT', 'JOYNER', 'KEATING', 'JAMISON', 'PACK', 'KINCAID', 'HACKETT', 'THAYER', 'GUIDRY', 'GUNN', 'OAKES', 'ADLER', 'CALVERT', 'OROURKE', 'CONROY', 'HAY', 'SHOOK', 'BAER', 'DIAZ', 'MICHAELS', 'MURDOCK', 'SLAUGHTER', 'TYSON', 'KEARNEY', 'LIGHT', 'COATES', 'ATWOOD', 'HARDEN', 'SCHREIBER', 'SHAVER', 'PRATER', 'MEDEIROS', 'DUTTON', 'MUNSON', 'HOFFMANN', 'READ', 'LANDERS', 'SCHILLING', 'BAUM', 'HUTTON', 'ADAIR', 'SAPP', 'MAGUIRE', 'MCCOLLUM', 'STAPLETON', 'CRUM', 'HURT', 'RADER', 'WAITE', 'RIVERS', 'DELUCA', 'JANSEN', 'EDMONDS', 'DOSS', 'GIORDANO', 'MARCUM', 'HURD', 'KENNY', 'CRANDALL', 'BRENNER', 'DORAN', 'FRIEND', 'DIETRICH', 'SORENSON', 'LACKEY', 'STALEY', 'SCHWARZ', 'HAWLEY', 'WALDRON', 'DOBBS', 'FERREIRA', 'MADISON', 'VANDYKE', 'STANFORD', 'TRENT', 'LAUGHLIN', 'JEFFRIES', 'MATTSON', 'MCLAIN', 'WETZEL', 'BURKHART', 'ROMAN', 'HENNING', 'SANDS', 'HERNDON', 'HONEYCUTT', 'FONTENOT', 'SHEFFIELD', 'HORVATH', 'BROWNE', 'MCNALLY', 'AMOS', 'LANGFORD', 'KEENE', 'CRAIN', 'ALTMAN', 'CODY', 'SPICER', 'SEWELL', 'SAUER', 'GOINS', 'MOSHER', 'NAGY', 'HELM', 'SYKES', 'EUBANKS', 'ROCHE', 'RUSHING', 'HENLEY', 'THORPE', 'CLEARY', 'GILLIS', 'ERVIN', 'SILVERMAN', 'ROPER', 'RUDOLPH', 'POSEY', 'HUGGINS', 'BURROWS', 'LUNSFORD', 'BAIN', 'LACY', 'DENNY', 'EASTMAN', 'CROCKETT', 'RAINEY', 'MOTT', 'GAUTHIER', 'WESTBROOK', 'CULVER', 'HAUSER', 'REAGAN', 'IRVIN', 'RIDER', 'DOBSON', 'HANKS', 'SAYLOR', 'STAUFFER', 'SCHAEFFER', 'JARRETT', 'FAGAN', 'LOMBARDO', 'OAKLEY', 'STREET', 'KYLE', 'CORNELIUS', 'HUDDLESTON', 'MONAHAN', 'HUMPHRIES', 'CHRISTIE', 'REDMOND', 'PARR', 'HUMMEL', 'STONER', 'JACOB', 'WEINER', 'CHADWICK', 'BECKMAN', 'GENTILE', 'HUSTON', 'VARNER', 'LENTZ', 'PYLE', 'WHITT', 'CARMICHAEL', 'THORNE', 'LEONE', 'BURKS', 'GROVER', 'SIMMS', 'CORNETT', 'BURNHAM', 'SPIVEY', 'HAWK', 'CALL', 'COE', 'GRUBB', 'MCCORD', 'LADD', 'ADAMSON', 'NUGENT', 'LANIER', 'DUFF', 'BRUNNER', 'ARNETT', 'BRYSON', 'MATTINGLY', 'WHITTINGTON', 'SYLVESTER', 'TIMMONS', 'COMER', 'UNGER', 'KERNS', 'TALBOT', 'FAY', 'LANGSTON', 'DOWLING', 'COTTRELL', 'GANNON', 'COREY', 'CORMIER', 'BEEBE', 'BURK', 'AMBROSE', 'CROWELL', 'MARCUS', 'RAMOS', 'TILLEY', 'KELLOGG', 'HOLLIDAY', 'DEMARCO', 'WAGONER', 'CRAVEN', 'BETTS', 'BREWSTER', 'QUEEN', 'TILLMAN', 'STJOHN', 'OSWALD', 'COUGHLIN', 'ASHBY', 'LORENZ', 'KAMINSKI', 'SCHULER', 'FENTON', 'MEEHAN', 'CRUZ', 'NAGEL', 'BARGER', 'ENNIS', 'BARTH', 'LOOMIS', 'FAUST', 'ROLAND', 'PEREIRA', 'IVERSON', 'REARDON', 'JEFFERS', 'ANDERS', 'BLEDSOE', 'BAUMANN', 'PRESLEY', 'HARE', 'WOODY', 'VERNON', 'WAGGONER', 'ROWLEY', 'WOODALL', 'CLEMONS', 'GOODE', 'MELVIN', 'CONN', 'HARMAN', 'PRESCOTT', 'HANNAH', 'STUMP', 'MEEK', 'BURDICK', 'CORLEY', 'FLOOD', 'POWER', 'NAYLOR', 'ARNDT', 'GAGE', 'PEDERSON', 'NEWCOMB', 'TATUM', 'WHITLOCK', 'PFEIFFER', 'PURDY', 'MICHAUD', 'WHITFIELD', 'NEWSOME', 'MAIER', 'ROARK', 'BLISS', 'FOOTE', 'CUTLER', 'LAY', 'KEARNS', 'WEINSTEIN', 'DURBIN', 'STEARNS', 'PARIS', 'BOUDREAUX', 'RAPP', 'PURVIS', 'GODDARD', 'FOURNIER', 'HUTSON', 'LOMBARDI', 'BAGLEY', 'HAMLIN', 'GABRIEL', 'MOSELEY', 'ABRAHAM', 'BAUGHMAN', 'GEE', 'GRUBER', 'MULLIGAN', 'MCDONNELL', 'ALLEY', 'BRUNER', 'GRUBBS', 'GRANGER', 'MOCK', 'COVINGTON', 'GOLDSMITH', 'DEATON', 'PERDUE', 'SKELTON', 'MORELAND', 'WILLOUGHBY', 'BROWER', 'MAHAN', 'STODDARD', 'HILLIARD', 'RUTH', 'BARON', 'OGLE', 'LACEY', 'TABOR', 'RYDER', 'STARKEY', 'OUELLETTE', 'BURR', 'FOSS', 'CROUSE', 'KRUGER', 'PRITCHETT', 'MCMAHAN', 'ESTEP', 'COY', 'STRAUSS', 'BARTLEY', 'DAIGLE', 'HIGGINBOTHAM', 'HEATON', 'GOETZ', 'HECK', 'GUNDERSON', 'RENNER', 'JOHN', 'GRAF', 'LIND', 'ABERNATHY', 'LAWLER', 'CLEMENS', 'BARTHOLOMEW', 'HOUGH', 'GALE', 'ROONEY', 'HARMS', 'STRINGER', 'SMALLWOOD', 'PRIEST', 'WHITTAKER', 'DONOHUE', 'TIERNEY', 'EPSTEIN', 'STUBBS', 'TROYER', 'HAMBY', 'KAHN', 'TRIMBLE', 'HOGUE', 'LUKE', 'CHASTAIN', 'THURSTON', 'BRANNON', 'MALLOY', 'BOCK', 'IRELAND', 'HILLMAN', 'FAIRCHILD', 'FLINT', 'MORRISSEY', 'VANHORN', 'THARP', 'CARNES', 'ROWELL', 'FERRARA', 'CHEEK', 'CREECH', 'MOELLER', 'WILKES', 'PAYTON', 'MICHEL', 'HERRMANN', 'RUSS', 'SQUIRES', 'CHAMPION', 'LEARY', 'HITCHCOCK', 'TITUS', 'ELLER', 'WRAY', 'RINEHART', 'HACKER', 'MAJOR', 'WILES', 'BORDEN', 'GILLILAND', 'WORTHINGTON', 'MAST', 'OVERTON', 'YOUNGBLOOD', 'DEVRIES', 'SEAMAN', 'MCGREGOR', 'SCHERER', 'STARNES', 'BARNEY', 'WILLEY', 'MINTON', 'STCLAIR', 'MACKENZIE', 'LINCOLN', 'BURNETTE', 'HUMPHREYS', 'WISNIEWSKI', 'HEIN', 'DAMICO', 'BOUCHARD', 'BACHMAN', 'BEAM', 'FOUNTAIN', 'RHOADS', 'LUTHER', 'BRANTLEY', 'STALLINGS', 'STEWARD', 'WHITING', 'HOLM', 'WAHL', 'SOUSA', 'WESTFALL', 'PRUETT', 'LOVETT', 'ISAACS', 'DOW', 'MCNULTY', 'SHANK', 'GIVENS', 'SNODGRASS', 'SMILEY', 'CRUMP', 'ROBB', 'VITALE', 'STEINBERG', 'BUSBY', 'REYES', 'EMMONS', 'ROWAN', 'UPTON', 'WENDT', 'SHELLEY', 'FUCHS', 'BOLES', 'BALES', 'RECTOR', 'MCCARTNEY', 'FINNEY', 'ELLSWORTH', 'NOONAN', 'MORALES', 'STAPLES', 'WHITTEN', 'STRANGE', 'TROTTER', 'BLANK', 'SHIPMAN', 'POLK', 'GRAFF', 'PRATHER', 'CROOK', 'BELANGER', 'NICKERSON', 'TEMPLETON', 'BEAVERS', 'SCHELL', 'HOOK', 'KINSEY', 'RUCKER', 'MCNEILL', 'GRIFFITHS', 'HOPE', 'WATT', 'GARBER', 'PENDLETON', 'HOOKER', 'TRAHAN', 'CONDON', 'MESSINA', 'NORWOOD', 'DOUGLASS', 'HOUCK', 'KEENER', 'KENYON', 'WILL', 'DOWD', 'JERNIGAN', 'DENNISON', 'STOCK', 'ADCOCK', 'BRANHAM', 'EBERT', 'CHRISTY', 'FAIR', 'MCCAIN', 'SAMS', 'HERRINGTON', 'SEITZ', 'DANIELSON', 'KNOTT', 'CHENEY', 'BURROUGHS', 'SCHUBERT', 'JARRELL', 'PEASE', 'BREEN', 'DICKENS', 'CARRIER', 'TROUT', 'CURRIE', 'MAIN', 'TRIPLETT', 'REES', 'PICKERING', 'FARRAR', 'BOLIN', 'VICK', 'JOLLY', 'JAEGER', 'DARBY', 'DOWELL', 'PARISH', 'KELSEY', 'CARON', 'COBURN', 'FRANTZ', 'REICH', 'BEARDEN', 'WILLETT', 'KITCHEN', 'BOLLINGER', 'SATTERFIELD', 'GANN', 'RUDD', 'WINSLOW', 'DRUMMOND', 'CASPER', 'MARLOW', 'WAY', 'WHITMORE', 'DENNEY', 'SALISBURY', 'CLEVENGER', 'HOBSON', 'WAKEFIELD', 'DEVLIN', 'MCCLELLAND', 'NEWBERRY', 'BARONE', 'MARTINO', 'AMATO', 'HASKINS', 'WHIPPLE', 'CASTRO', 'ORTIZ', 'LEAVITT', 'ELY', 'ASHER', 'SPEAR', 'GIRARD', 'STOREY'];

export interface Item {
	id: number;
	name: string;
	surname: string;
	short: string;
	active: boolean;
	visible: boolean;
	order: number;
}

export interface PageRow {
	id: number;
	title: string;
	//
	pageType: string;
	pageTypeId: number;
	//
	template: string;
	templateId: number;
	//
	category: string;
	categoryId: number;
	//
	market: string;
	marketId: number;
	//
	active: boolean;
	actions: number[];
}

@Injectable({
	providedIn: 'root',
})
export class DataService {

	get(count: number = 100): Observable<PageRow[]> {
		return of(this.getPageRows(count));
	}

	getPageRows(count: number = 100): PageRow[] {
		return new Array(count).fill(null).map((x, i) => {
			const id = i + 1;
			const pageType = PAGE_TYPES[Math.floor(Math.random() * PAGE_TYPES.length)];
			const title = pageType.name + (pageType.isIndex ? `` : ` ${id}`);
			return {
				id,
				title,
				//
				pageType: pageType.name,
				pageTypeId: pageType.id,
				//
				template: pageType.name,
				templateId: 100 + pageType.id,
				//
				category: pageType.name,
				categoryId: 200 + pageType.id,
				//
				market: 'en',
				marketId: 1,
				//
				active: Math.random() > 0.5,
				visible: Math.random() > 0.5,
				order: Math.floor(Math.random() * 100000),
				actions: [],
			};
		});
	}

	getFakeData(count: number = 100): Item[] {
		return new Array(count).fill(null).map((x, i) => {
			const name = NAMES[Math.floor(Math.random() * NAMES.length)];
			const surname = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
			const letter = String.fromCharCode(65 + Math.floor(Math.random() * 22));
			return {
				id: i + 1,
				name,
				surname,
				active: Math.random() > 0.5,
				visible: Math.random() > 0.5,
				order: Math.floor(Math.random() * 100000),
				short: name.substr(0, 1) + surname.substr(0, 1),
			}
		})
	}

}

