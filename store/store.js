import PubSub from '../lib/pubsub.js';

export default class Store {
    constructor(params) {
        let self = this;
        // Add some default objects to hold our actions, mutations and state
        this.actions = {};
        this.mutations = {};
        this.state = {};

        // Attach our PubSub module as an `events` element
        this.events = new PubSub();

        // Look in the passed params object for actions and mutations 
        // that might have been passed in
        if(params.hasOwnProperty('actions')) {
            this.actions = params.actions;
        }
        
        if(params.hasOwnProperty('mutations')) {
            this.mutations = params.mutations;
        }

        // Set our state to be a Proxy. We are setting the default state by 
        // checking the params and defaulting to an empty object if no default 
        // state is passed in
        this.state = new Proxy((params.state || {}), {
            set: function(state, key, value) {
                // Set the value as we would normally
                state[key] = value;
                
                // Trace out to the console. This will be grouped by the related action
                console.log(`stateChange: ${key}:`, value);
               
                // Publish the change event for the components that are listening
                self.events.publish('stateChange', self.state);
                
                return true;
            }
        });
    }

    /**
     * A dispatcher for actions that looks in the actions 
     * collection and runs the action if it can find it
     */
    dispatch(actionKey, payload) {
        // Run a quick check to see if the action actually exists
        // before we try to run it
        if(typeof this.actions[actionKey] !== 'function') {
          console.error(`Action ${actionKey} doesn't exist.`);
          return false;
        }
        
        // Create a console group which will contain the logs from our Proxy etc
        console.log(`ACTION: ${actionKey}`);
        
        // Actually call the action and pass it the Store context and whatever payload was passed
        this.actions[actionKey](this, payload);
        
        return true;
    }

    /**
     * Look for a mutation and modify the state object 
     * if that mutation exists by calling it
   */
    commit(mutationKey, payload) {
        // Run a quick check to see if this mutation actually exists
        // before trying to run it
        if(typeof this.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }
        
        // Get a new version of the state by running the mutation and storing the result of it
        let newState = this.mutations[mutationKey]({...this.state}, payload);
        
        // Merge the old and new together to create a new state and set it
        this.state = Object.assign(this.state, newState);
        
        return true;
    }
}