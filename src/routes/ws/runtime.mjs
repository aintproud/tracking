import RuntimePrototype from 'src/modules/ws/runtimePrototype.mjs';
import classes from 'src/routes/ws/classesLoader.mjs';
class Runtime extends RuntimePrototype{
  constructor(classes){
    super(classes)
  }
}

export default new Runtime(classes)