import RuntimePrototype from 'src/modules/ws/runtimePrototype.mjs';
import classes from 'src/routes/ws/classesLoader.mjs';
export default new class extends RuntimePrototype{
  constructor(){
    super(classes)
  }
}